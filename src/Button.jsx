import  React from 'react';


function Button({onClick,className,content}){

    return <>
    <button onClick={onClick} className={className} >{content} </button>
    </>
}

export default Button;