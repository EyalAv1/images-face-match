"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ModalProps = {
  logo: string;
  navLinks: Array<{ title: string; link: string }>;
};

const DesktopHeader: React.FC<ModalProps> = ({ logo, navLinks }) => {
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
    </div>
  );
};

export default DesktopHeader;
