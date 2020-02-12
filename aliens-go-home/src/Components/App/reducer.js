import { consts } from "./actions";
import { moveObjects, startGame, shoot } from "../../utils/functions";

const initialGameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  lastObjectCreatedAt: new Date(),
  currentPlayer: null,
  players: null,
  cannonBalls: []
};

const initialState = {
  angle: 45,
  gameState: initialGameState
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case consts.MOVE_OBJECTS:
      return moveObjects(state, action);
    case consts.START_GAME:
      return startGame(state, initialGameState);
    case consts.LEADERBOARD_LOADED:
      return {
        ...state,
        players: action.players
      };
    case consts.LOGGED_IN:
      return {
        ...state,
        currentPlayer: action.player
      };
    case consts.SHOOT:
      return shoot(state, action);
    default:
      return state;
  }
}

export default reducer;
