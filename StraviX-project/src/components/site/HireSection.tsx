import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import character from "@/assets/nexus_character_flipped.png.asset.json";
import { contact } from "@/lib/portfolio";

export function HireSection() {
  const charRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = charRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hire-section" id="hire" aria-label="Hire me">
      <div className="hire-glow hire-glow--cyan" />
      <div className="hire-glow hire-glow--purple" />
      <div className="hire-curtain" />

      <div className="hire-stage">
        <div className="hire-text">
          <a className="hire-link" href={contact.instagram.url} target="_blank" rel="noreferrer">
            <span className="hire-word">Hire me</span>
            <span className="hire-arrow">
              <ArrowUpRight strokeWidth={2.6} />
            </span>
          </a>
          <p className="hire-tagline">
            Turn your ideas into <em>reality.</em>
          </p>
        </div>
        <div ref={charRef} className="hire-character" data-visible={visible}>
          <img src={character.url} alt={`${contact.name} character`} />
        </div>
      </div>

      <footer className="hire-footer">
        <div className="flex items-center gap-3">
          <a className="footer-icon" href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`}>
            <Mail size={18} />
          </a>
          <a className="footer-icon" href={contact.instagram.url} target="_blank" rel="noreferrer" aria-label={`Instagram ${contact.instagram.handle}`}>
            <Instagram size={18} />
          </a>
          <a className="footer-icon" href={contact.discord.url} target="_blank" rel="noreferrer" aria-label={`Discord ${contact.name}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 4.5a19 19 0 0 0-4 1.3C2.2 8.7 1.2 12 1.5 16a18 18 0 0 0 5.3 2.7l1.2-2.1m8-12.1a19 19 0 0 1 4 1.3c1.8 2.9 2.8 6.2 2.5 10.2a18 18 0 0 1-5.3 2.7L16 16.6M8 4.5l.6 1.4a17 17 0 0 1 6.8 0l.6-1.4M6 15.5a15 15 0 0 0 12 0" />
              <ellipse cx="8.5" cy="11.7" rx="1" ry="1.5" />
              <ellipse cx="15.5" cy="11.7" rx="1" ry="1.5" />
            </svg>
          </a>
        </div>
        <span>© {new Date().getFullYear()} {contact.name}</span>
      </footer>
    </section>
  );
}
