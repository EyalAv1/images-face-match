"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
  logo: string;
  navLinks: Array<{ title: string; link: string }>;
};

const MobileHeader: React.FC<ModalProps> = ({ logo, navLinks }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* HEADER (unchanged) */}
      <div className="headerContainer">
        {!isOpen && (
          <div className="wrapper">
            <div className="liquidGlass-wrapper dock">
              <div className="liquidGlass-effect"></div>
              <div className="liquidGlass-tint"></div>
              <div className="liquidGlass-shine"></div>

              <div className="liquidGlass-text">
                <div className="dock">
                  <img
                    src="/menu.png"
                    width={50}
                    height={50}
                    alt="menu"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* LIQUID GLASS DRAWER */}
      <div className={`mobile-drawer-glass ${isOpen ? "open" : ""}`}>
        <div className="liquidGlass-wrapper drawer-glass">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>

          <div className="liquidGlass-text drawer-content">
            <img
              className="desktopHeaderLogo"
              src={logo}
              alt="logo"
              width={100}
              height={100}
              onClick={() => {
                router.push("/");
              }}
            />
            {navLinks.map((link) => (
              <div
                key={link.link}
                className="drawer-link"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/${link.link}`);
                }}
              >
                {link.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
