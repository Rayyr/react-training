import React from "react"

const GooeyFilter = ({ id = "goo-filter", strength = 10 }) => {
  return (
    <svg className="absolute w-0 h-0" style={{ pointerEvents: "none" }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export { GooeyFilter }