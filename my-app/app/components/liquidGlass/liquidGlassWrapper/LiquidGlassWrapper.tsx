"use client";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  blur?: number;
  distortion?: number;
  tintBg?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function LiquidGlassWrapper({
  children,
  className = "",
  blur = 20,
  distortion = 1,
  tintBg = "",
  style = {},
  onClick,
}: Props) {
  return (
    <div
      className={`liquidGlass-wrapper dock ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div
        className="liquidGlass-shine"
        style={{ background: `${tintBg}` }}
      ></div>
      <div className="liquidGlass-text">{children}</div>
    </div>
  );
}
