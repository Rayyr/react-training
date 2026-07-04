export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
  title,
  children,
  ...props
}) {
  const gradient = `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`;

  const onEnter = (e) => {
    e.currentTarget.style.boxShadow =
      "0 0 20px rgba(200, 255, 112, 0.7), 0 0 40px rgba(200,80,192,.5), 0 0 60px rgba(65,88,208,.3)";
    e.currentTarget.style.filter = "brightness(1.5)";
  };
  const onLeave = (e) => {
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.filter = "none";
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...props}
      style={{
        borderRadius: "1.5rem",
        padding: "2px",
        backgroundImage: gradient,
        transition: "box-shadow .5s ease, filter .5s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "30rem",
          overflow: "hidden",
          borderRadius: "calc(1.5rem - 2px)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "calc(1.5rem - 2px)",
            backgroundImage: gradient,
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "16rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            background: "linear-gradient(45deg, #4A148C, #9C27B0)", // 💜 gradient
            padding: "1rem",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#f9fafb",
            }}
          >
            {title}
          </div>
          <div
            style={{
              flex: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(243,244,246,0.8)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
