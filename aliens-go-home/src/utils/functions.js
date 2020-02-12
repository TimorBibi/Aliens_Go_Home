import {
  calculateAngle,
  calculateNextPosition,
  checkCollision
} from "./formulas";
import { flyingObjectsStarterMaxXAxis, gameHeight } from "./constants";
import createFlyingObjects from "../Components/FlyingObject/reducer";

export function moveObjects(state, action) {
  if (!state.gameState.started) return state;

  let cannonBalls = moveBalls(state.gameState.cannonBalls);

  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0
  };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  let flyingObjects = newState.gameState.flyingObjects.filter(
    object => now - object.createdAt < 4000
  );

  const lostLife = state.gameState.flyingObjects.length > flyingObjects.length;
  let lives = state.gameState.lives;
  if (lostLife) {
    lives--;
  }

  const started = lives > 0;
  if (!started) {
    flyingObjects = [];
    cannonBalls = [];
    lives = 3;
  }
  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(
    object => object.cannonBallId
  );
  const flyingDiscsDestroyed = objectsDestroyed.map(
    object => object.flyingDiscId
  );

  cannonBalls = cannonBalls.filter(cannonBall =>
    cannonBallsDestroyed.indexOf(cannonBall.id)
  );
  flyingObjects = flyingObjects.filter(flyingDisc =>
    flyingDiscsDestroyed.indexOf(flyingDisc.id)
  );

  const kills = state.gameState.kills + flyingDiscsDestroyed.length;
  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls: [...cannonBalls],
      lives,
      kills,
      started
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

export function shoot(state, action) {
  if (!state.gameState.started) return state;

  const { cannonBalls } = state.gameState;

  if (cannonBalls.length === 2) return state;

  const { x, y } = action.mousePosition;

  const angle = calculateAngle(0, 0, x, y);

  const id = new Date().getTime();
  const cannonBall = {
    position: { x: 0, y: 0 },
    angle,
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonBalls: [...cannonBalls, cannonBall]
    }
  };
}

const moveBalls = cannonBalls =>
  cannonBalls
    .filter(
      cannonBall =>
        cannonBall.position.y > -800 &&
        cannonBall.position.x > -500 &&
        cannonBall.position.x < 500
    )
    .map(cannonBall => {
      const { x, y } = cannonBall.position;
      const { angle } = cannonBall;
      return {
        ...cannonBall,
        position: calculateNextPosition(x, y, angle, 5)
      };
    });

const checkCollisions = (cannonBalls, flyingDiscs) => {
  const objectsDestroyed = [];
  flyingDiscs.forEach(flyingDisc => {
    const currentLifeTime = new Date().getTime() - flyingDisc.createdAt;
    const calculatedPosition = {
      x: flyingDisc.position.x,
      y: flyingDisc.position.y + (currentLifeTime / 4000) * gameHeight
    };
    const rectA = {
      x1: calculatedPosition.x - 40,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + 40,
      y2: calculatedPosition.y + 10
    };
    cannonBalls.forEach(cannonBall => {
      const rectB = {
        x1: cannonBall.position.x - 8,
        y1: cannonBall.position.y - 8,
        x2: cannonBall.position.x + 8,
        y2: cannonBall.position.y + 8
      };
      if (checkCollision(rectA, rectB)) {
        objectsDestroyed.push({
          cannonBallId: cannonBall.id,
          flyingDiscId: flyingDisc.id
        });
      }
    });
  });
  return objectsDestroyed;
};
