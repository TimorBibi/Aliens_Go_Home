import {
  createInterval,
  flyingObjectsStarterYAxis,
  maxFlyingObjects
} from "../../utils/constants";
import { generateRandomFlyingObjectStartX } from "../../utils/functions";

export default state => {
  if (!state.gameState.started) return state; // game not running

  const now = new Date().getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects;

  if (!createNewObject) return state; // no need to create objects now

  const id = new Date().getTime();
  const flyingObjectPosition = generateRandomFlyingObjectStartX();
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis
    },
    createdAt: new Date().getTime(),
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: new Date()
    }
  };
};
