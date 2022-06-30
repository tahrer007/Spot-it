import React from "react";
//import "../../App.css";
//import "../home/home.css";
import "./about.css";
import aboutText from "../../services/data/aboutPageText";

const About = () => {
  return (
    <div className="pagesContainer about">
      <div className="homePageLeft aboutText">
        {aboutText.map((x,i) => (
          <div className="textBox" key={i}>
            <h1>{x.boxTitle} </h1>
            {x.questions.map((y) => (
              <>
                <h3> {y.question} </h3>
                <p>{y.answer}</p>
              </>
            ))}
          </div>
        ))}
      </div>

      <div className="aboutRight">
        <div className="imgBox box-1"></div>
        <div className="imgBox box-2"></div>
        <div className="imgBox box-3"></div>
      </div>
    </div>
  );
};
export default About;
