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

  const started = props.gameState.started;
  const flyingObjects = props.gameState.flyingObjects.map(obj => (
    <FlyingObject key={obj.id} position={obj.position} />
  ));
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
      <Ground />
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={50} />

      <Heart position={{ x: -300, y: 35 }} />

      {!started && (
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title />
        </g>
      )}
      {started && <g>{flyingObjects}</g>}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  trackMouse: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  startGame: PropTypes.func.isRequired
};

export default Canvas;
