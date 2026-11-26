import { useEffect, useRef } from "react";

/**
 * Glossy pixel wordmark drawn on a canvas and split into a spring mesh:
 * drag it to stretch, move across it to make it wobble.
 */
export function ElasticTitle({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 44;
    const ROWS = 18;
    const N = (COLS + 1) * (ROWS + 1);
    const ox = new Float32Array(N);
    const oy = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    let occupied: boolean[] = [];
    let src: HTMLCanvasElement | null = null;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let disposed = false;
    let drawn = false;

    const pointer = { x: 0, y: 0, px: 0, py: 0, inside: false, down: false, gx: 0, gy: 0 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const o = off.getContext("2d");
      if (!o) return;
      o.scale(dpr, dpr);

      let size = 100;
      o.font = `700 ${size}px "Pixelify Sans", monospace`;
      const measured = o.measureText(text).width;
      size = Math.min((size * w * 0.8) / measured, h * 0.42);
      const font = `700 ${size}px "Pixelify Sans", monospace`;
      o.font = font;
      o.textAlign = "center";
      o.textBaseline = "middle";
      const cx = w / 2;
      const cy = h / 2;
      const depth = Math.max(4, Math.round(size * 0.09));

      // Extruded body
      for (let i = depth; i > 0; i--) {
        const t = i / depth;
        o.fillStyle = `rgb(${Math.round(4 + 10 * (1 - t))}, ${Math.round(48 + 62 * (1 - t))}, ${Math.round(72 + 78 * (1 - t))})`;
        o.fillText(text, cx + i * 0.35, cy + i);
      }

      // Glossy face on its own layer so highlights stay inside the letters
      const face = document.createElement("canvas");
      face.width = off.width;
      face.height = off.height;
      const f = face.getContext("2d");
      if (!f) return;
      f.scale(dpr, dpr);
      f.font = font;
      f.textAlign = "center";
      f.textBaseline = "middle";
      const top = cy - size / 2;
      const grad = f.createLinearGradient(0, top, 0, top + size);
      grad.addColorStop(0, "#a8f7ff");
      grad.addColorStop(0.45, "#22d3ee");
      grad.addColorStop(1, "#0891b2");
      f.fillStyle = grad;
      f.fillText(text, cx, cy);
      f.globalCompositeOperation = "source-atop";
      const shine = f.createLinearGradient(0, top, 0, top + size * 0.55);
      shine.addColorStop(0, "rgba(255,255,255,0.65)");
      shine.addColorStop(0.5, "rgba(255,255,255,0.12)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      f.fillStyle = shine;
      f.fillRect(0, top, w, size * 0.55);
      f.strokeStyle = "rgba(255,255,255,0.35)";
      f.lineWidth = Math.max(1, size * 0.012);
      f.strokeText(text, cx - size * 0.01, cy - size * 0.012);
      o.drawImage(face, 0, 0, w, h);

      // Mark cells with ink so empty ones are skipped while drawing
      const data = o.getImageData(0, 0, off.width, off.height).data;
      occupied = [];
      const cw = off.width / COLS;
      const ch = off.height / ROWS;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let hit = false;
          for (let sy = 0; sy < 4 && !hit; sy++) {
            for (let sx = 0; sx < 4 && !hit; sx++) {
              const px = Math.floor(c * cw + ((sx + 0.5) * cw) / 4);
              const py = Math.floor(r * ch + ((sy + 0.5) * ch) / 4);
              if ((data[(py * off.width + px) * 4 + 3] ?? 0) > 8) hit = true;
            }
          }
          occupied.push(hit);
        }
      }
      src = off;
    };

    const restX = (c: number) => (c / COLS) * w;
    const restY = (r: number) => (r / ROWS) * h;

    // Undo the wrapper's -3deg tilt so the pointer lines up with the letters
    const toLocal = (clientX: number, clientY: number) => {
      const parent = canvas.parentElement ?? canvas;
      const rect = parent.getBoundingClientRect();
      const ccx = rect.left + rect.width / 2;
      const ccy = rect.top + rect.height / 2;
      const a = (3 * Math.PI) / 180;
      const dx = clientX - ccx;
      const dy = clientY - ccy;
      return {
        x: dx * Math.cos(a) - dy * Math.sin(a) + w / 2,
        y: dx * Math.sin(a) + dy * Math.cos(a) + h / 2,
      };
    };

    const step = () => {
      if (disposed) return;
      raf = requestAnimationFrame(step);
      if (!src || !w) return;

      const radius = Math.min(w, h) * 0.38;
      const pdx = pointer.x - pointer.px;
      const pdy = pointer.y - pointer.py;
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      let energy = 0;

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const i = r * (COLS + 1) + c;
          const rx = restX(c);
          const ry = restY(r);
          let ax = -0.06 * ox[i]!;
          let ay = -0.06 * oy[i]!;

          // Smooth neighbours so the surface behaves like jelly
          let nx = 0;
          let ny = 0;
          let n = 0;
          if (c > 0) { nx += ox[i - 1]!; ny += oy[i - 1]!; n++; }
          if (c < COLS) { nx += ox[i + 1]!; ny += oy[i + 1]!; n++; }
          if (r > 0) { nx += ox[i - COLS - 1]!; ny += oy[i - COLS - 1]!; n++; }
          if (r < ROWS) { nx += ox[i + COLS + 1]!; ny += oy[i + COLS + 1]!; n++; }
          ax += 0.12 * (nx / n - ox[i]!);
          ay += 0.12 * (ny / n - oy[i]!);

          if (pointer.down) {
            const d = Math.hypot(rx - pointer.gx, ry - pointer.gy);
            const wgt = Math.exp(-(d * d) / (2 * radius * radius));
            const tx = (pointer.x - pointer.gx) * wgt;
            const ty = (pointer.y - pointer.gy) * wgt;
            ax += (tx - ox[i]!) * 0.25 * wgt;
            ay += (ty - oy[i]!) * 0.25 * wgt;
          } else if (pointer.inside && (pdx || pdy)) {
            const d = Math.hypot(rx + ox[i]! - pointer.x, ry + oy[i]! - pointer.y);
            const wgt = Math.exp(-(d * d) / (2 * (radius * 0.5) ** 2));
            ax += pdx * 0.35 * wgt;
            ay += pdy * 0.35 * wgt;
          }

          vx[i] = (vx[i]! + ax) * 0.9;
          vy[i] = (vy[i]! + ay) * 0.9;
          ox[i] = ox[i]! + vx[i]!;
          oy[i] = oy[i]! + vy[i]!;
          energy += Math.abs(vx[i]!) + Math.abs(vy[i]!) + Math.abs(ox[i]!) * 0.01;
        }
      }

      if (energy < 0.02 && !pointer.down && drawn) return;
      drawn = true;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sw = src.width / COLS;
      const sh = src.height / ROWS;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!occupied[r * COLS + c]) continue;
          const tl = r * (COLS + 1) + c;
          const tr = tl + 1;
          const bl = tl + COLS + 1;
          const x0 = restX(c) + ox[tl]!;
          const y0 = restY(r) + oy[tl]!;
          const ax = restX(c + 1) + ox[tr]! - x0;
          const ay = restY(r) + oy[tr]! - y0;
          const bx = restX(c) + ox[bl]! - x0;
          const by = restY(r + 1) + oy[bl]! - y0;
          ctx.setTransform(ax * dpr, ay * dpr, bx * dpr, by * dpr, x0 * dpr, y0 * dpr);
          ctx.drawImage(src, c * sw, r * sh, sw, sh, 0, 0, 1.04, 1.04);
        }
      }
    };

    const onDown = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer.down = true;
      pointer.gx = p.x;
      pointer.gy = p.y;
      pointer.x = pointer.px = p.x;
      pointer.y = pointer.py = p.y;
      if (e.pointerType === "mouse") canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.inside = true;
    };
    const onUp = () => {
      pointer.down = false;
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      build();
      drawn = false;
    });

    document.fonts.load(`700 64px "Pixelify Sans"`).finally(() => {
      if (disposed) return;
      build();
      // Entrance wobble
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          vy[r * (COLS + 1) + c] = Math.sin((c / COLS) * Math.PI * 2) * 6;
        }
      }
      ro.observe(canvas);
      step();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="elastic-canvas" role="img" aria-label={text} />;
}
