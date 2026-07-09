import React from "react";
import styles from '../../../styles/bubble.module.css';

const BubbleText = ({children,color,fontSize}) => {
  return (
    <div className=" place-content-center mt-[40px] ">
      <Text textContent={children} color={color} fontSize={fontSize} />
    </div>
  );
};

const Text = ({textContent,color,fontSize}) => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300" style={{fontSize,fontWeight:"bold" ,color}}>
      {`${textContent}`.split("").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;