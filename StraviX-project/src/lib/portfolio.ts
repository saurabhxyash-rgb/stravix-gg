import raistarLogo from "@/assets/raistar_logo.jpg.asset.json";
import sniperlordLogo from "@/assets/sniperlord_logo.jpg.asset.json";
import kattyskingdomLogo from "@/assets/kattyskingdom_logo_white.jpg.asset.json";
import riotffLogo from "@/assets/riotff_logo_white.jpg.asset.json";
import tpEsportsLogo from "@/assets/tp_esports_logo.jpg.asset.json";
import kaal1267Logo from "@/assets/kaal1267_logo.jpg.asset.json";
import thumbKaal from "@/assets/thumbs/Z2tHDL31Ftk.jpg.asset.json";
import thumbRiotMemes from "@/assets/thumbs/qAykcZH0tPM.jpg.asset.json";
import thumb2 from "@/assets/thumbs/TMa4mEJNmPM.jpg.asset.json";
import thumbRiotDuo from "@/assets/thumbs/Tcrm2Q0HObk.jpg.asset.json";
import thumbRiotAi from "@/assets/thumbs/LzvirDn9o4s.jpg.asset.json";
import thumbRiotCollection from "@/assets/thumbs/VoWqGZhYCJU.jpg.asset.json";

export const contact = {
  name: "StraviX",
  email: "Contactstravix@gmail.com",
  instagram: { handle: "@Stravixagency", url: "https://instagram.com/Stravixagency" },
  discord: { url: "https://dsc.gg/stravix" },
};

/** YouTube video playing behind the big title at the top of the page */
export const heroVideoId = "GDEaBvnzSfs";

export type Creator = {
  title: string;
  handle: string;
  /** Subscriber count, animated up from zero when the card opens */
  subscribers: number;
  /** Highlighted card with an animated glowing ring */
  featured?: boolean;
  logo: string;
  channelUrl: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
};

export const creators: Creator[] = [
  {
    title: "RaiStar",
    handle: "@raistar",
    subscribers: 12_900_000,
    featured: true,
    logo: raistarLogo.url,
    channelUrl: "https://www.youtube.com/@raistar",
    accentColor: "#3fb8ff",
    glowColor: "rgba(63, 184, 255, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(63, 184, 255, 0.26) 0%, rgba(6, 22, 52, 0.92) 60%, #020814 100%)",
  },
  {
    title: "SniperLord",
    handle: "@sniperlordpro",
    subscribers: 2_360_000,
    featured: true,
    logo: sniperlordLogo.url,
    channelUrl: "https://www.youtube.com/@sniperlordpro",
    accentColor: "#00c8ff",
    glowColor: "rgba(0, 200, 255, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(0, 200, 255, 0.24) 0%, rgba(4, 20, 40, 0.92) 60%, #01060f 100%)",
  },
  {
    title: "Katty's Kingdom",
    handle: "@kattyskingdom",
    subscribers: 835_000,
    featured: true,
    logo: kattyskingdomLogo.url,
    channelUrl: "https://www.youtube.com/@kattyskingdom",
    accentColor: "#f7078e",
    glowColor: "rgba(247, 7, 142, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(247, 7, 142, 0.24) 0%, rgba(40, 4, 26, 0.92) 60%, #0d0108 100%)",
  },
  {
    title: "RIOT FF",
    handle: "@riotffofficial",
    subscribers: 8_940_000,
    featured: true,
    logo: riotffLogo.url,
    channelUrl: "https://www.youtube.com/@riotffofficial",
    accentColor: "#f01d47",
    glowColor: "rgba(240, 29, 71, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(240, 29, 71, 0.24) 0%, rgba(38, 4, 12, 0.92) 60%, #0c0105 100%)",
  },
  {
    title: "TP ESPORTS",
    handle: "@TPESPORTS1M",
    subscribers: 1_140_000,
    featured: true,
    logo: tpEsportsLogo.url,
    channelUrl: "https://www.youtube.com/@TPESPORTS1M",
    accentColor: "#2f8dff",
    glowColor: "rgba(47, 141, 255, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(47, 141, 255, 0.24) 0%, rgba(5, 16, 42, 0.92) 60%, #010613 100%)",
  },
  {
    title: "Kaal",
    handle: "@kaal1267",
    subscribers: 71_700,
    featured: true,
    logo: kaal1267Logo.url,
    channelUrl: "https://www.youtube.com/@kaal1267",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.55)",
    bgGradient: "radial-gradient(circle at 50% 28%, rgba(168, 85, 247, 0.24) 0%, rgba(26, 6, 46, 0.92) 60%, #08010f 100%)",
  },
];

export type FeaturedVideo = {
  id: string;
  title: string;
  creator: string;
  glow: string;
  thumb: string;
};

export const videos: FeaturedVideo[] = [
  { id: "Z2tHDL31Ftk", thumb: thumbKaal.url, title: "Transforming My Subscriber 7-Year-Old ID Into PRIME 8 in Just 24 Hours! 😱", creator: "Kaal", glow: "rgba(255, 178, 0, 0.45)" },
  { id: "qAykcZH0tPM", thumb: thumbRiotMemes.url, title: "FREE FIRE MEMES 😂 SHERU BHAI KE MEMES DEKH KAR HASI NAHI RUKEGI 🤣", creator: "RiotxSuhel", glow: "rgba(47, 141, 255, 0.45)" },
  { id: "TMa4mEJNmPM", thumb: thumb2.url, title: "Guild Test of Random Subscriber 1v3 | Garena Free Fire", creator: "SniperLord", glow: "rgba(0, 200, 255, 0.45)" },
  { id: "Tcrm2Q0HObk", thumb: thumbRiotDuo.url, title: "RIOT FF Needs A Female Dynamic Duo 😭", creator: "RIOT FF", glow: "rgba(240, 29, 71, 0.45)" },
  { id: "LzvirDn9o4s", thumb: thumbRiotAi.url, title: "AI NE TOH HAD KAR DI BHAI 😂😭 | MEME REACTION", creator: "RiotxSuhel", glow: "rgba(47, 141, 255, 0.45)" },
  { id: "VoWqGZhYCJU", thumb: thumbRiotCollection.url, title: "करोड़ों का Free Fire Collection?! SERU BHAI vs RIOT FF ☠️", creator: "RIOT FF", glow: "rgba(240, 29, 71, 0.45)" },
];

