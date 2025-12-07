"use client";

import { useEffect, useState } from "react";
import DesktopHeader from "./desktopHeader/DesktopHeader";
import MobileHeader from "./mobileHeader/MobileHeader";

type HeraderProps = {
  logo: string;
  navLinks: Array<{ title: string; link: string }>;
};

export default function Header({ logo, navLinks }: HeraderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Run only on client
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile ? (
    <MobileHeader logo={logo} navLinks={navLinks} />
  ) : (
    <DesktopHeader logo={logo} navLinks={navLinks} />
  );
}
