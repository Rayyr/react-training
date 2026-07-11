import React from 'react';
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText";


function About(){

    return (
     <div  >

      {/* Title */}
      <BubbleText color="#9C27B0" fontSize="100px">
        About
      </BubbleText>

   <div className="mt-10 max-w-2xl mx-auto ">

<p className="text-2xl md:text-3xl leading-relaxed text-[#9C2799] tracking-wide">
    Our student management system is designed to simplify and enhance the
    educational experience for both students and administrators. It provides an
    organized and efficient way to manage student information.
  </p>

<p className="mt-12 text-xl md:text-2xl text-[#9C2799] leading-relaxed">
    With a focus on usability, performance, and reliability, we aim to support
    modern learning environments by making information accessible, clear, and
    easy to manage.
  </p>

</div>
    </div>
    );
   
}

export default About;