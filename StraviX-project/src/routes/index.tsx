import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { ClientsSection } from "@/components/site/ClientsSection";
import { VideosSection } from "@/components/site/VideosSection";
import { HireSection } from "@/components/site/HireSection";

const title = "StraviX — Video Editor & VFX Artist";
const description =
  "StraviX crafts high-retention gaming, anime and YouTube edits for creators like RaiStar, The RawKnee Games, LitFleet, I am Bixu and SarahGrace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative w-full overflow-x-clip bg-void">
      <SiteHeader />
      <HeroSection />
      <main className="content-flow">
        <ClientsSection />
        <VideosSection />
        <HireSection />
      </main>
    </div>
  );
}
