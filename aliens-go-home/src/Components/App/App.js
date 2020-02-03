import React, { Component } from "react";
import { connect } from "react-redux";
import { methods } from "./actions";
import PropTypes from "prop-types";
import Canvas from "../Canvas/Canvas";
import { getCanvasPosition } from "../../utils/formulas";

class App extends Component {
  componentDidMount() {
    const self = this;
    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);

    window.onresize = () => {
      const cnv = document.getElementById("aliens-go-home-canvas");
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <div className="App">
        <Canvas
          angle={this.props.angle}
          gameState={this.props.gameState}
          startGame={this.props.startGame}
          trackMouse={event => this.trackMouse(event)}
        />
      </div>
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  angle: state.appReducer.angle,
  gameState: state.appReducer.gameState
});

const mapDispatchToProps = dispatch => ({
  moveObjects: mousePosition => {
    dispatch(methods.moveObjects(mousePosition));
  },
  startGame: () => {
    dispatch(methods.startGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
