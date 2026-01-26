"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function KineticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const hover = useMotionValue(0);

  const xs = useSpring(x, { stiffness: 500, damping: 30 });
  const ys = useSpring(y, { stiffness: 500, damping: 30 });
  const hs = useSpring(hover, { stiffness: 400, damping: 28 });

  const size = useTransform(hs, (v) => (v ? 48 : 10));

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hover.set(el.closest("a,button") ? 1 : 0);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y, hover]);

  return (
    <motion.div
      className="fixed pointer-events-none z-9999 mix-blend-difference"
      style={{
        x: xs,
        y: ys,
        translateX: "-50%",
        translateY: "-50%",
      }}>
      <motion.div
        className="rounded-full bg-white"
        style={{
          width: size,
          height: size,
        }}
      />
    </motion.div>
  );
}
