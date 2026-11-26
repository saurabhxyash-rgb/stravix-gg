import { describe, expect, it } from "vitest";
import { contact } from "@/lib/portfolio";

describe("StraviX contact details", () => {
  it("uses the StraviX email", () => {
    expect(contact.email).toBe("Contactstravix@gmail.com");
  });

  it("links Instagram to Stravixagency", () => {
    expect(contact.instagram.handle).toBe("@Stravixagency");
    expect(contact.instagram.url).toBe("https://instagram.com/Stravixagency");
  });

  it("has no X (Twitter) link", () => {
    expect("x" in contact).toBe(false);
  });

  it("links Discord to the StraviX server", () => {
    expect(contact.discord.url).toBe("https://dsc.gg/stravix");
  });
});
