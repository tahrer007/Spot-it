import React, { useRef, useEffect } from "react";
import { init } from "ityped";

import "./error.css" ;

const Error =()=>{
    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
          showCursor: true,
          backDelay: 1500,
          typeSpeed: 100,
          disableBackTyping: false,
    
          strings: ["Something Wrong. Please try again later.🥲"],
        });
    },[]);

    return <div className="leftSideInnerBox error"><p>
    <span ref={textRef}></span>
  </p> </div>
}

export default Error