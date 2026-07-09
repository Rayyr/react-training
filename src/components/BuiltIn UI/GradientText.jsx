import React from "react";
import { motion } from "motion/react";

// simple className join helper
const cn = (...classes) => classes.filter(Boolean).join(" ");

function GradientText({
  text,
  className,
  gradient = "linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)",
  neon = false,
  transition = { duration: 3, repeat: Infinity, ease: "linear" },
  ...props
}) {
  const baseStyle = {
    backgroundImage: gradient,
  };

  return (
    <span
      className={cn("relative inline-block", className)}
      {...props}
    >
      {/* Main gradient text */}
      <motion.span
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        className="text-transparent bg-clip-text bg-[length:200%_100%]"
        style={baseStyle}
        transition={transition}
      >
        {text}
      </motion.span>

      {/* Neon glow effect */}
      {neon && (
        <motion.span
          animate={{ backgroundPositionX: ["0%", "200%"] }}
          className="absolute top-0 left-0 text-transparent bg-clip-text blur-[8px] mix-blend-plus-lighter bg-[length:200%_100%]"
          style={baseStyle}
          transition={transition}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

export default GradientText;