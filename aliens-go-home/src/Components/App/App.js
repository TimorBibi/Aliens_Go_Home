import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Canvas from "../Canvas/Canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  message: state.appReducer.message
});

export default connect(mapStateToProps)(App);
