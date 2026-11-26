import { describe, expect, it, vi } from "vitest";
import { bindBackgroundPlayback } from "@/lib/background-playback";

describe("nonstop background playback", () => {
  const setup = () => {
    const frame = document.createElement("iframe");
    document.body.append(frame);
    const target = frame.contentWindow;
    if (!target) throw new Error("Missing iframe window");
    const post = vi.spyOn(target, "postMessage");
    const playing = vi.fn();
    const cleanup = bindBackgroundPlayback(frame, playing);
    post.mockClear();
    const state = (info: number, origin = "https://www.youtube-nocookie.com") => {
      window.dispatchEvent(new MessageEvent("message", {
        origin, source: target, data: JSON.stringify({ event: "onStateChange", info }),
      }));
    };
    const commands = () => post.mock.calls.map(([data]) => JSON.parse(String(data)));
    const done = () => { cleanup(); post.mockRestore(); frame.remove(); };
    return { state, commands, playing, done };
  };
  it("restarts at zero when the background video ends", () => {
    const player = setup();
    player.state(0);
    expect(player.commands()).toEqual([
      { event: "command", func: "seekTo", args: [0, 1] },
      { event: "command", func: "mute", args: [] },
      { event: "command", func: "playVideo", args: [] },
    ]);
    player.done();
  });
  it("resumes muted playback if the background pauses", () => {
    const player = setup();
    player.state(2);
    expect(player.commands()).toEqual([
      { event: "command", func: "mute", args: [] },
      { event: "command", func: "playVideo", args: [] },
    ]);
    player.done();
  });
  it("only reveals the video after playback actually starts", () => {
    const player = setup();
    player.state(3);
    expect(player.playing).not.toHaveBeenCalled();
    player.state(1);
    expect(player.playing).toHaveBeenCalledOnce();
    player.done();
  });
  it("ignores messages from other websites", () => {
    const player = setup();
    player.state(0, "https://example.com");
    expect(player.commands()).toEqual([]);
    player.done();
  });
});