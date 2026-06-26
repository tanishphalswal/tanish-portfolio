"use client";

import { useRef, useState } from "react";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  strength?: number;
};

export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  }

  function handleMouseLeave() {
    setTransform("translate(0px, 0px)");
  }

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`magnetic-btn inline-flex ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
