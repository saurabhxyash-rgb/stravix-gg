import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, House, SquarePlay, UserSearch } from "lucide-react";
import { contact } from "@/lib/portfolio";

const items = [
  { id: "home", label: "home", Icon: House },
  { id: "clients", label: "work", Icon: BriefcaseBusiness },
  { id: "videos", label: "videos", Icon: SquarePlay },
  { id: "hire", label: "hire", Icon: UserSearch },
] as const;

type SectionId = (typeof items)[number]["id"];

function goTo(id: SectionId) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [pointerX, setPointerX] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const probe = window.innerHeight * 0.45;
      let current: SectionId = "home";
      for (const id of ["clients", "videos", "hire"] as const) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scaleFor = (i: number) => {
    const el = itemRefs.current[i];
    if (pointerX === null || !el) return 1;
    const r = el.getBoundingClientRect();
    const d = Math.abs(pointerX - (r.left + r.width / 2));
    return 1 + 0.45 * Math.max(0, 1 - d / 110);
  };

  return (
    <header>
      <a
        href="#home"
        className="brand-pill"
        data-scrolled={scrolled}
        aria-label={`${contact.name} home`}
        onClick={(e) => {
          e.preventDefault();
          goTo("home");
        }}
      >
        <span className="brand-text">{contact.name}</span>
      </a>
      <nav
        className="dock"
        data-scrolled={scrolled}
        aria-label="Sections"
        onMouseMove={(e) => setPointerX(e.clientX)}
        onMouseLeave={() => setPointerX(null)}
      >
        {items.map(({ id, label, Icon }, i) => (
          <button
            key={id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            className="dock-item"
            data-active={active === id}
            aria-label={label}
            aria-current={active === id ? "true" : undefined}
            style={{ transform: `scale(${scaleFor(i)})` }}
            onClick={() => goTo(id)}
          >
            <Icon strokeWidth={2.2} />
            {active === id && !scrolled && <span className="dock-dot" />}
            <span className="dock-label">{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
