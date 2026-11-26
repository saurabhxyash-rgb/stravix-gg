import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { videos, type FeaturedVideo } from "@/lib/portfolio";

function VideoModal({ video, onClose }: { video: FeaturedVideo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="video-modal" role="dialog" aria-modal="true" aria-label="Featured video" onClick={onClose}>
      <div
        className="video-modal-dialog"
        style={{ "--video-glow": video.glow } as CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title="Featured video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <button type="button" className="video-modal-close fixed top-5 right-5" onClick={onClose} aria-label="Close video">
        <X size={20} />
      </button>
    </div>,
    document.body,
  );
}

export function VideosSection() {
  const [playing, setPlaying] = useState<FeaturedVideo | null>(null);

  return (
    <section className="videos-section" id="videos" aria-labelledby="videos-title">
      <h2 id="videos-title" className="title-videos">
        Featured Videos
      </h2>
      <div className="videos-grid">
        {videos.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className="video-card"
            aria-label={`Play featured video ${i + 1}`}
            style={{ "--video-glow": v.glow } as CSSProperties}
            onClick={() => setPlaying(v)}
          >
            <span className="video-card-glow" />
            <span className="video-card-frame">
              <img src={v.thumb} alt={`Featured video ${i + 1} thumbnail`} loading="lazy" />
              <span className="video-card-shade" />
              <span className="video-card-meta">
                <span className="video-play">
                  <Play size={16} fill="currentColor" />
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      {playing && <VideoModal video={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
}
