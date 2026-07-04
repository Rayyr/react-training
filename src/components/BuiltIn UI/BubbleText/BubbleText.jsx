import React from "react";
import styles from '../../../styles/bubble.module.css';

const BubbleText = ({children}) => {
  return (
    <div className=" place-content-center mt-[40px] ">
      <Text textContent={children} />
    </div>
  );
};

const Text = ({textContent}) => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300" style={{fontWeight:"bold" ,color:"#9C27B0"}}>
      {`${textContent}`.split("").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;