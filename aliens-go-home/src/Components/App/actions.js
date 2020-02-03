export const consts = {
  MOVE_OBJECTS: "MOVE_OBJECTS",
  START_GAME: "START_GAME"
};

const moveObjects = mousePosition => ({
  type: consts.MOVE_OBJECTS,
  mousePosition
});

const startGame = () => ({
  type: consts.START_GAME
})

export const methods = {
    moveObjects: moveObjects,
    startGame: startGame
}