import { useEffect, useRef, useState } from "react";
import cover from "@/assets/bleach_showreel_cover.jpg.asset.json";
import grain from "@/assets/grain.png.asset.json";
import { contact, heroVideoId } from "@/lib/portfolio";
import { ElasticTitle } from "./ElasticTitle";
import { bindBackgroundPlayback } from "@/lib/background-playback";

const embedUrl =
  `https://www.youtube-nocookie.com/embed/${heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideoId}` +
  "&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1";

export function HeroSection() {
  // The YouTube player only mounts in the browser; its loading screen stays hidden behind the cover image
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const frame = frameRef.current;
    if (!mounted || !frame) return;
    return bindBackgroundPlayback(frame, () => setReady(true));
  }, [mounted]);

  return (
    <section className="hero" id="home" aria-label="Intro">
      <div className="hero-media" aria-hidden="true">
        <img className="hero-cover" src={cover.url} alt="" />
        {mounted && (
          <iframe
            ref={frameRef}
            className="hero-yt"
            data-ready={ready}
            src={`${embedUrl}&origin=${encodeURIComponent(window.location.origin)}`}
            title="Showreel"
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        )}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" style={{ backgroundImage: `url(${grain.url})` }} />
      <h1 className="sr-only">{contact.name} — Professional Video Editor & Visual Effects Artist</h1>
      <div className="hero-title-wrap">
        <ElasticTitle text={contact.name} />
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-text">SCROLL</span>
        <span className="scroll-mouse" />
      </div>
    </section>
  );
}
