import { useState, useEffect } from "react"

export function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let timeoutId

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 250)
    }

    updateDimensions()
    window.addEventListener("resize", debouncedUpdateDimensions)

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions;
}