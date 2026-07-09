import React from "react"
import { GooeyFilter } from "./Animated Background/GooeyFilter";
import { PixelTrail } from "./Animated Background/pixel-trail";
 import { useScreenSize } from "../../hooks/use-screen-size";

function GooeyDemo({children}) {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-center gap-8 bg-white text-center text-pretty overflow-hidden">
       
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-[#9C27B0]"
        />
      </div>

       <p className="text-[#9C27B0] text-7xl z-10 font-bold w-1/2  " >
       {children}
        </p>
    
     
    </div>
  )
}

export { GooeyDemo }
