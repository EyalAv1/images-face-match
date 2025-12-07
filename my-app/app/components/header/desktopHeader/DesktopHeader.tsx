"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ModalProps = {
  logo: string;
  navLinks: Array<{ title: string; link: string }>;
};

const DesktopHeader: React.FC<ModalProps> = ({logo, navLinks }) => {
  const router = useRouter();
  return (
    <div className="headerContainer">
      <div className="wrapper">
        <div className="liquidGlass-wrapper dock">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
          <div className="liquidGlass-text">
            <div className="dock">
              <Image
                className="desktopHeaderLogo"
                src={logo}
                alt="logo"
                width={55}
                height={55}
                onClick={() => {
                  router.push("/");
                }}
              />
              <div className="desktopHeaderNavLinks">
                {navLinks &&
                  navLinks.map((link) => {
                    return (
                      <h1
                        className="desktopHeaderNavLinksLink"
                        key={link.link}
                        onClick={() => router.push(`/${link.link}`)}
                      >
                        {link.title}
                      </h1>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg style={{ display: "none" }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
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
            result="litImage"
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
  );
};

export default DesktopHeader;
