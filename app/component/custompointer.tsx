"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursorLayout({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursor = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const cursorElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable only for non-touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      cursor.current.x += (mouse.x - cursor.current.x) * 0.1;
      cursor.current.y += (mouse.y - cursor.current.y) * 0.1;

      if (cursorElRef.current) {
        cursorElRef.current.style.transform = `translate(${cursor.current.x - 16}px, ${cursor.current.y - 16}px)`;
        cursorElRef.current.style.width = isHovering ? "150px" : "40px";
        cursorElRef.current.style.height = isHovering ? "150px" : "40px";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafRef.current!);
    };
  }, [mouse, isHovering]);

  useEffect(() => {
    if (!enabled) return;

    const targetDiv = document.querySelectorAll(".cursor-hover-target");

    targetDiv.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHovering(true));
      el.addEventListener("mouseleave", () => setIsHovering(false));
    });

    return () => {
      targetDiv.forEach((el) => {
        el.removeEventListener("mouseenter", () => setIsHovering(true));
        el.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, [enabled]);

  return (
    <div className="relative">
      {/* Show custom cursor only if enabled */}
      {enabled && (
        <div
          ref={cursorElRef}
          id="custom-cursor"
          className="fixed pointer-events-none z-[9999] rounded-full border dark:border-white border-black bg-white/50  transition-all duration-200 ease-out"
        /> 
        //mix-blend-difference
      )}
      {/* Page Content */}
      <div className={enabled ? "cursor-none" : ""}>{children}</div>
    </div>
  );
}
