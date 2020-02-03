import { calculateAngle } from "./formulas";
import { flyingObjectsStarterMaxXAxis } from "./constants";
import createFlyingObjects from "../Components/FlyingObject/reducer";

export function moveObjects(state, action) {
  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0
  };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  const flyingObjects = newState.gameState.flyingObjects.filter(
    object => now - object.createdAt < 4000
  );

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects
    },
    angle
  };
}

export function startGame(state, initGameState) {
  return {
    ...state,
    gameState: {
      ...initGameState,
      started: true
    }
  };
}

export function generateRandomFlyingObjectStartX() {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return Math.floor(Math.random() * flyingObjectsStarterMaxXAxis) * sign;
}
