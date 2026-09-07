import { useLocation, Link } from "react-router-dom";
import ProfileImg from "../../assets/images/Me.png";

const NAV_LINKS = ["Work", "Services", "Pricing", "Blog"];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="flex justify-center px-6 pt-6">
      <div className="flex items-center bg-[#fdfdfd] border border-surface-border rounded-pill py-2 pr-2 pl-2">
        <div className="flex items-center gap-3 pl-1 pr-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
            <img
              src={ProfileImg}
              alt="Ishara Udayanga"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-display font-semibold text-sm text-text-secondary tracking-tight">
              Ishara Udayanga
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                className="font-body font-semibold text-sm text-text-secondary hover:text-text-muted transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <Link
            to="/lets-talk"
            className="bg-surface border border-surface-border text-text-secondary font-display font-medium text-sm px-5 py-2 rounded-pill hover:bg-surface-offwhite transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

