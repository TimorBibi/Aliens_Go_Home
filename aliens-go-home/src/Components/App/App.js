import React, { Component } from "react";
import { connect } from "react-redux";
import { methods } from "./actions";
import PropTypes from "prop-types";
import Canvas from "../Canvas/Canvas";
import { getCanvasPosition } from "../../utils/formulas";
import * as Auth0 from "auth0-web";
import io from "socket.io-client";

Auth0.configure({
  domain: "dev-urm1d5um.auth0.com",
  clientID: "VrrB1nd0Hd7N5OVBc1edUnMMo33nMALT",
  redirectUri: "http://localhost:3000/",
  responseType: "token id_token",
  scope: "openid profile manage:points",
  audience: "https://aliens-go-home.digituz.com.br"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.shoot = this.shoot.bind(this);
    this.socket = null;
    this.currentPlayer = null;
  }

  componentDidMount() {
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe(auth => {
      if (!auth) return;

      const playerProfile = Auth0.getProfile();
      self.currentPlayer = {
        id: playerProfile.sub,
        maxScore: 0,
        name: playerProfile.name,
        picture: playerProfile.picture
      };
      this.props.loggedIn(self.currentPlayer);

      self.socket = io("http://localhost:3001", {
        query: `token=${Auth0.getAccessToken()}`
      });

      self.socket.on('players', (players) => {
        this.props.leaderboardLoaded(players);
        players.forEach((player) => {
          if (player.id === self.currentPlayer.id) {
            self.currentPlayer.maxScore = player.maxScore;
          }
        });
      });
    });

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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.gameState.started && this.props.gameState.started) {
      if (this.currentPlayer.maxScore < this.props.gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: this.props.gameState.kills,
        });
      }
    }
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        gameState={this.props.gameState}
        startGame={this.props.startGame}
        trackMouse={event => this.trackMouse(event)}
        currentPlayer={this.props.currentPlayer}
        players={this.props.players}
        shoot={this.shoot}
      />
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
  startGame: PropTypes.func.isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }),
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    })
  ),
  shoot: PropTypes.func.isRequired
};

App.defaultProps = {
  currentPlayer: null,
  players: null
};

const mapStateToProps = state => ({
  angle: state.appReducer.angle,
  gameState: state.appReducer.gameState,
  currentPlayer: state.appReducer.currentPlayer,
  players: state.appReducer.players
});

const mapDispatchToProps = dispatch => ({
  moveObjects: mousePosition => {
    dispatch(methods.moveObjects(mousePosition));
  },
  startGame: () => {
    dispatch(methods.startGame());
  },
  leaderboardLoaded: players => {
    dispatch(methods.leaderboardLoaded(players));
  },
  loggedIn: player => {
    dispatch(methods.loggedIn(player));
  },
  shoot: mousePosition => {
    dispatch(methods.shoot(mousePosition));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
