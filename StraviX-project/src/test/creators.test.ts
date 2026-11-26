import { describe, expect, it } from "vitest";
import { creators } from "@/lib/portfolio";

describe("creator channels", () => {
  it("opens SniperLord's real channel", () => {
    const sniperlord = creators.find((c) => c.title === "SniperLord");
    expect(sniperlord?.channelUrl).toBe("https://www.youtube.com/@sniperlordpro");
    expect(sniperlord?.handle).toBe("@sniperlordpro");
  });

  it("opens Katty's Kingdom real channel", () => {
    const katty = creators.find((c) => c.title === "Katty's Kingdom");
    expect(katty?.channelUrl).toBe("https://www.youtube.com/@kattyskingdom");
    expect(katty?.handle).toBe("@kattyskingdom");
  });

  it("opens RIOT FF's real channel", () => {
    const riot = creators.find((c) => c.title === "RIOT FF");
    expect(riot?.channelUrl).toBe("https://www.youtube.com/@riotffofficial");
    expect(riot?.handle).toBe("@riotffofficial");
  });

  it("opens TP ESPORTS's real channel from the fifth card", () => {
    const tp = creators[4];
    expect(tp?.channelUrl).toBe("https://www.youtube.com/@TPESPORTS1M");
    expect(tp?.handle).toBe("@TPESPORTS1M");
  });

  it("opens Kaal's real channel", () => {
    const kaal = creators.find((c) => c.title === "Kaal");
    expect(kaal?.channelUrl).toBe("https://www.youtube.com/@kaal1267");
    expect(kaal?.handle).toBe("@kaal1267");
  });

  it("points every card at a youtube channel", () => {
    for (const c of creators) {
      expect(c.channelUrl.startsWith("https://www.youtube.com/@")).toBe(true);
    }
  });
});
