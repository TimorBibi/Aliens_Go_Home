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
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <div className="App">
        <Canvas
          angle={this.props.angle}
          trackMouse={event => this.trackMouse(event)}
        />
      </div>
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  angle: state.appReducer.angle
});

const mapDispatchToProps = dispatch => ({
  moveObjects: mousePosition => {
    dispatch(methods.moveObjects(mousePosition));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
