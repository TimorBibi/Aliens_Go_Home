import { consts } from "./actions";
import { moveObjects, startGame } from "../../utils/functions";

const initialGameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  lastObjectCreatedAt: new Date()
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
    default:
      return state;
  }
}

export default reducer;
