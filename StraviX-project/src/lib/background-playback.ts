/** Keep the muted YouTube background running through its iframe API. */
export function bindBackgroundPlayback(frame: HTMLIFrameElement, onPlaying: () => void) {
  const origin = "https://www.youtube-nocookie.com";
  const command = (func: string, args: number[] = []) => {
    frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), origin);
  };
  const play = () => {
    command("mute");
    command("playVideo");
  };
  const listen = () => {
    frame.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: "stravix-background" }), origin);
  };
  const onMessage = (event: MessageEvent) => {
    if (event.origin !== origin || event.source !== frame.contentWindow) return;
    let message: { event?: string; info?: number | { playerState?: number } };
    try {
      message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
    } catch { return; }
    if (!message || typeof message !== "object") return;
    if (message.event === "onReady") play();
    const state = message.event === "onStateChange" && typeof message.info === "number"
      ? message.info
      : message.event === "infoDelivery" && typeof message.info === "object"
        ? message.info?.playerState
        : undefined;
    if (state === 1) onPlaying();
    if (state === 0) {
      command("seekTo", [0, 1]);
      play();
    } else if (state === 2 || state === -1 || state === 5) {
      play();
    }
  };
  const resume = () => { if (!document.hidden) play(); };
  window.addEventListener("message", onMessage);
  window.addEventListener("focus", resume);
  document.addEventListener("visibilitychange", resume);
  frame.addEventListener("load", listen);
  const handshake = window.setInterval(listen, 1500);
  listen();
  return () => {
    window.clearInterval(handshake);
    window.removeEventListener("message", onMessage);
    window.removeEventListener("focus", resume);
    document.removeEventListener("visibilitychange", resume);
    frame.removeEventListener("load", listen);
  };
}