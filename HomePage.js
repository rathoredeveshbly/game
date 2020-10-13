import React, { Component } from "react";
import HardWood from "../BackgroundImages/hardwood.jpg";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${HardWood})`,
          backgroundSize: `${window.innerWidth}px ${
            window.innerHeight * 0.8
          }px`,
          backgroundRepeat: "no-repeat",
          height: 800,
          width: window.innerWidth,
        }}
      ></div>
    );
  }
}

export default HomePage;
