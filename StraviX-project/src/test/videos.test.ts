import { describe, expect, it } from "vitest";
import { videos } from "@/lib/portfolio";

describe("featured videos", () => {
  it("plays the RiotxSuhel memes video as the 2nd card", () => {
    const second = videos[1];
    expect(second?.id).toBe("qAykcZH0tPM");
    expect(second?.title).toContain("FREE FIRE MEMES");
    expect(second?.creator).toBe("RiotxSuhel");
  });

  it("plays the Kaal Prime 8 video as the 1st card", () => {
    const first = videos[0];
    expect(first?.id).toBe("Z2tHDL31Ftk");
    expect(first?.title).toContain("PRIME 8");
    expect(first?.creator).toBe("Kaal");
  });

  it("plays the SniperLord guild test video as the 3rd card", () => {
    const third = videos[2];
    expect(third?.id).toBe("TMa4mEJNmPM");
    expect(third?.title).toContain("Guild Test of Random Subscriber 1v3");
    expect(third?.creator).toBe("SniperLord");
  });

  it("plays the RIOT FF female dynamic duo video as the 4th card", () => {
    const fourth = videos[3];
    expect(fourth?.id).toBe("Tcrm2Q0HObk");
    expect(fourth?.title).toContain("Female Dynamic Duo");
    expect(fourth?.creator).toBe("RIOT FF");
  });

  it("plays the RiotxSuhel AI meme reaction video as the 5th card", () => {
    const fifth = videos[4];
    expect(fifth?.id).toBe("LzvirDn9o4s");
    expect(fifth?.title).toContain("AI NE TOH HAD KAR DI");
    expect(fifth?.creator).toBe("RiotxSuhel");
  });

  it("plays the RIOT FF collection video as the 6th card", () => {
    const sixth = videos[5];
    expect(sixth?.id).toBe("VoWqGZhYCJU");
    expect(sixth?.title).toContain("SERU BHAI vs RIOT FF");
    expect(sixth?.creator).toBe("RIOT FF");
  });

  it("has a real youtube id and cover for every card", () => {
    for (const v of videos) {
      expect(v.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
      expect(v.thumb.startsWith("/__l5e/assets-v1/")).toBe(true);
      expect(v.title.length).toBeGreaterThan(3);
    }
  });
});
