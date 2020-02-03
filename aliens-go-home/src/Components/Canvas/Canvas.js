import React from "react";
import PropTypes from "prop-types";
import { gameHeight } from "../../utils/constants";
import Sky from "./Sky";
import Ground from "./Ground";
import CannonBase from "../Cannon/CanonBase";
import CannonPipe from "../Cannon/CanonPipe";
import CannonBall from "../Cannon/CannonBall";
import CurrentScore from "./CurrentScore";
import FlyingObject from "../FlyingObject/FlyingObject";
import Heart from "./Heart";
import StartGame from "./StartGame";
import Title from "./Title";

const Canvas = props => {
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight
  ];
  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Title />
      <Ground />
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={50} />
      <CannonBall position={{ x: 0, y: -500 }} />
      <FlyingObject position={{ x: -150, y: -300 }} />
      <FlyingObject position={{ x: 150, y: -300 }} />
      <Heart position={{ x: -300, y: 35 }} />
      <StartGame onClick={() => console.log("Aliens, Go Home!")} />
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  trackMouse: PropTypes.func.isRequired
};

export default Canvas;
