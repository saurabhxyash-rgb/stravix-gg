import { describe, expect, it } from "vitest";
import { formatSubscribers } from "@/lib/format";
import { creators } from "@/lib/portfolio";

describe("subscriber counts", () => {
  it("shows RaiStar with 12.9M subscribers", () => {
    const raistar = creators.find((c) => c.title === "RaiStar");
    expect(raistar).toBeDefined();
    expect(formatSubscribers(raistar?.subscribers ?? 0)).toBe("12.9M");
  });
  it("shows SniperLord with 2.36M subscribers", () => {
    const sniperlord = creators.find((c) => c.title === "SniperLord");
    expect(sniperlord).toBeDefined();
    expect(formatSubscribers(sniperlord?.subscribers ?? 0, 2)).toBe("2.36M");
    expect(sniperlord?.featured).toBe(true);
  });
  it("shows Katty's Kingdom with 835K subscribers", () => {
    const katty = creators.find((c) => c.title === "Katty's Kingdom");
    expect(katty).toBeDefined();
    expect(formatSubscribers(katty?.subscribers ?? 0)).toBe("835K");
    expect(katty?.featured).toBe(true);
  });
  it("shows RIOT FF with 8.94M subscribers", () => {
    const riot = creators.find((c) => c.title === "RIOT FF");
    expect(riot).toBeDefined();
    expect(formatSubscribers(riot?.subscribers ?? 0, 2)).toBe("8.94M");
    expect(riot?.featured).toBe(true);
  });
  it("shows TP ESPORTS in the fifth card with 1.14M subscribers and animation", () => {
    const tp = creators[4];
    expect(tp?.title).toBe("TP ESPORTS");
    expect(tp?.subscribers).toBe(1_140_000);
    expect(formatSubscribers(tp?.subscribers ?? 0)).toBe("1.14M");
    expect(tp?.featured).toBe(true);
  });
  it("shows Kaal with 71.7K subscribers", () => {
    const kaal = creators.find((c) => c.title === "Kaal");
    expect(kaal).toBeDefined();
    expect(formatSubscribers(kaal?.subscribers ?? 0)).toBe("71.7K");
    expect(kaal?.featured).toBe(true);
  });
  it("keeps two decimals where the channel has them", () => {
    expect(formatSubscribers(4_150_000)).toBe("4.15M");
    expect(formatSubscribers(98_100)).toBe("98.1K");
  });
});
