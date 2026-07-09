import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const Button = ({ children , disabled, style, ...props }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || disabled) return; // skip the effect when disabled

    const handleMouseMove = (e) => {
      const { width } = btn.getBoundingClientRect();
      spanRef.current?.animate({ left: `${(e.offsetX / width) * 100}%` }, { duration: 250, fill: "forwards" });
    };
    const handleMouseLeave = () => {
      spanRef.current?.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.985 }}
      ref={btnRef}
      disabled={disabled}
      {...props}  // type, onClick, aria-*, name, etc. all flow through here
      style={{
        position: "relative",
        width: "100%",
        
        overflow: "hidden",
        borderRadius: "0.5rem",
        
        padding: "12px 16px",
        fontSize: "1.125rem",
        fontWeight: 500,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style, // let callers override/extend styles
      }}
    >
      <span style={{  position: "relative", zIndex: 10, pointerEvents: "none",  }}>
        {children}
      </span>
      <span
        ref={spanRef}
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          height: "8rem",
          width: "8rem",
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
          background: "#FFFFFF",
          
         color:"white"
        }}
      />
    </motion.button>
  );
};

export default Button;