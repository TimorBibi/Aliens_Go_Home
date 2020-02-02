export const consts = {
  MOVE_OBJECTS: "MOVE_OBJECTS"
};

const moveObjects = mousePosition => ({
  type: consts.MOVE_OBJECTS,
  mousePosition
});

export const methods = {
    moveObjects: moveObjects
}