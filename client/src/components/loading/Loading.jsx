import React, { useRef, useEffect } from "react";
import { init } from "ityped";
import "./loading.css" ;

const Loading =()=>{

    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
          showCursor: true,
          backDelay: 1500,
          typeSpeed: 100,
          disableBackTyping: false,
    
          strings: [" Loading ......."],
        }); 
    },[]);

    return <div className="leftSideInnerBox error"><p className="p1">
    <span ref={textRef}></span>
  </p> </div>}




export default Loading