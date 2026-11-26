import { useEffect, useState, type CSSProperties } from "react";
import { creators } from "@/lib/portfolio";
import { formatSubscribers } from "@/lib/format";

/** Counts the subscriber number up from zero each time the card opens. */
function SubscriberCount({ value, active }: { value: number; active: boolean }) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <span className="creator-count">{formatSubscribers(shown, shown < value ? 1 : 2)} Subscribers</span>;
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

export function ClientsSection() {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="clients-section" id="clients" aria-labelledby="clients-title">
      <div className="chassis">
        <div className="chassis-glow chassis-glow--cyan" />
        <div className="chassis-glow chassis-glow--purple" />
        <div className="chassis-lightbar" />
        <span className="chassis-bracket chassis-bracket--tl" />
        <span className="chassis-bracket chassis-bracket--tr" />
        <span className="chassis-bracket chassis-bracket--bl" />
        <span className="chassis-bracket chassis-bracket--br" />

        <h2 id="clients-title" className="title-clients">
          Worked with
        </h2>

        <div className="clients-grid">
          {creators.map((c) => (
            <a
              key={c.handle}
              href={c.channelUrl}
              target="_blank"
              rel="noreferrer"
              className="creator-card"
              data-open={open === c.handle}
              data-featured={c.featured ? "true" : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(c.handle)}
              onPointerLeave={() => setHovered(null)}
              aria-label={`View ${c.title} channel`}
              style={
                {
                  "--creator-accent": c.accentColor,
                  "--creator-glow": c.glowColor,
                  "--creator-bg": c.bgGradient,
                } as CSSProperties
              }
              onPointerUp={(e) => {
                // On touch screens, the first tap shows the details, the second opens the channel
                if (e.pointerType !== "mouse" && open !== c.handle) {
                  e.preventDefault();
                  setOpen(c.handle);
                }
              }}
              onClick={(e) => {
                if (open !== c.handle && window.matchMedia("(hover: none)").matches) e.preventDefault();
              }}
            >
              {c.featured && <span className="creator-ring" aria-hidden="true" />}
              <span className="creator-backdrop" />
              <span className="creator-glow" />
              <span className="creator-cross creator-cross--tl">+</span>
              <span className="creator-cross creator-cross--tr">+</span>
              <span className="creator-cross creator-cross--bl">+</span>
              <span className="creator-cross creator-cross--br">+</span>
              <span className="creator-avatar">
                <img src={c.logo} alt={`${c.title} photo`} loading="lazy" referrerPolicy="no-referrer" />
              </span>
              <span className="creator-info">
                <span className="creator-name">{c.title}</span>
                <span className="creator-handle">{c.handle}</span>
                <span className="creator-tag">
                  <YouTubeIcon />
                  <SubscriberCount value={c.subscribers} active={hovered === c.handle || open === c.handle} />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
