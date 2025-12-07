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

        {/* FILTER SVG (unchanged) */}
        <svg style={{ display: "none" }}>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves={1}
              seed={5}
              result="turbulence"
            />
            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
              <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
              <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
            </feComponentTransfer>
            <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
            <feSpecularLighting
              in="softMap"
              surfaceScale={5}
              specularConstant={1}
              specularExponent={100}
              lightingColor="white"
              result="specLight"
            >
              <fePointLight x={-200} y={-200} z={300} />
            </feSpecularLighting>
            <feComposite
              in="specLight"
              operator="arithmetic"
              k1={0}
              k2={1}
              k3={1}
              k4={0}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale={150}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
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
