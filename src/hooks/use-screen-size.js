import { useEffect, useState } from "react"

const SCREEN_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"]

const sizeOrder = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
}

class ComparableScreenSize {
  constructor(value) {
    this.value = value
  }

  toString() {
    return this.value
  }

  valueOf() {
    return sizeOrder[this.value]
  }

  equals(other) {
    return this.value === other
  }

  lessThan(other) {
    return this.valueOf() < sizeOrder[other]
  }

  greaterThan(other) {
    return this.valueOf() > sizeOrder[other]
  }

  lessThanOrEqual(other) {
    return this.valueOf() <= sizeOrder[other]
  }

  greaterThanOrEqual(other) {
    return this.valueOf() >= sizeOrder[other]
  }
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("xs")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width >= 1536) {
        setScreenSize("2xl")
      } else if (width >= 1280) {
        setScreenSize("xl")
      } else if (width >= 1024) {
        setScreenSize("lg")
      } else if (width >= 768) {
        setScreenSize("md")
      } else if (width >= 640) {
        setScreenSize("sm")
      } else {
        setScreenSize("xs")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return new ComparableScreenSize(screenSize)
}

export { useScreenSize }