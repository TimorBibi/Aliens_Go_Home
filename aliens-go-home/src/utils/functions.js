import { calculateAngle } from '../utils/formulas';

export function moveObjects(state, action) {
  if (!action.mousePosition) return state;
  const { x, y } = action.mousePosition;
  console.log(action.mousePosition);
  const angle = calculateAngle(0, 0, x, y);
  return {
    ...state,
    angle,
  };
}
