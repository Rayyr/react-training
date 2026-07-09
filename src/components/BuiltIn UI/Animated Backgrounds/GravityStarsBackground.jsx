import React, { useRef, useState, useEffect, useCallback } from "react";

// remove cn import or replace with simple class merge
const cn = (...classes) => classes.filter(Boolean).join(" ");

function GravityStarsBackground({
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  glowAnimation = "ease",
  movementSpeed = 0.3,
  mouseInfluence = 100,
  mouseGravity = "attract",
  gravityStrength = 75,
  starsInteraction = false,
  starsInteractionType = "bounce",
  className,
  children,
  ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [dpr, setDpr] = useState(1);
  const [canvasSize, setCanvasSize] = useState({
    width: 800,
    height: 600,
  });

  const readColor = useCallback(() => {
    const el = containerRef.current;
    if (!el) return "#ffffff";
    const cs = getComputedStyle(el);
    return cs.color || "#ffffff";
  }, []);

  const initStars = useCallback(
    (w, h) => {
      starsRef.current = Array.from({ length: starsCount }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = movementSpeed * (0.5 + Math.random() * 0.5);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * starsSize + 1,
          opacity: starsOpacity,
          baseOpacity: starsOpacity,
          mass: Math.random() * 0.5 + 0.5,
          glowMultiplier: 1,
          glowVelocity: 0,
        };
      });
    },
    [starsCount, movementSpeed, starsOpacity, starsSize],
  );

  const redistributeStars = useCallback((w, h) => {
    starsRef.current.forEach((p) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    setDpr(nextDpr);

    canvas.width = Math.floor(rect.width * nextDpr);
    canvas.height = Math.floor(rect.height * nextDpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    setCanvasSize({ width: rect.width, height: rect.height });

    if (starsRef.current.length === 0) {
      initStars(rect.width, rect.height);
    } else {
      redistributeStars(rect.width, rect.height);
    }
  }, [initStars, redistributeStars]);

  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if (e.touches) {
      const t = e.touches[0];
      if (!t) return;
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const updateStars = useCallback(() => {
    const w = canvasSize.width;
    const h = canvasSize.height;
    const mouse = mouseRef.current;

    starsRef.current.forEach((p, i) => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence;
        const nx = dx / dist;
        const ny = dy / dist;
        const g = force * (gravityStrength * 0.001);

        if (mouseGravity === "attract") {
          p.vx += nx * g;
          p.vy += ny * g;
        } else {
          p.vx -= nx * g;
          p.vy -= ny * g;
        }

        p.opacity = Math.min(1, p.baseOpacity + force * 0.4);
      } else {
        p.opacity = Math.max(p.baseOpacity * 0.3, p.opacity - 0.02);
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });
  }, [canvasSize, mouseInfluence, mouseGravity, gravityStrength]);

  const drawStars = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const color = readColor();

      starsRef.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    },
    [dpr, readColor],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    updateStars();
    drawStars(ctx);

    animRef.current = requestAnimationFrame(animate);
  }, [updateStars, drawStars]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={cn("  inset-0 w-full h-full  ", className)}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Content (registeration form) */}
      <div
        className="gravity-stars-content"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "1px 16px 48px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default GravityStarsBackground;
