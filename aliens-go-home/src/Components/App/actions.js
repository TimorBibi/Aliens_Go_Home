export const consts = {
  MOVE_OBJECTS: "MOVE_OBJECTS",
  START_GAME: "START_GAME",
  LEADERBOARD_LOADED: "LEADERBOARD_LOADED",
  LOGGED_IN: "LOGGED_IN",
  SHOOT: 'SHOOT',
};

const moveObjects = mousePosition => ({
  type: consts.MOVE_OBJECTS,
  mousePosition
});

const startGame = () => ({
  type: consts.START_GAME
});

const leaderboardLoaded = players => ({
  type: consts.LEADERBOARD_LOADED,
  players
});

const loggedIn = player => ({
  type: consts.LOGGED_IN,
  player
});

const shoot = (mousePosition) => ({
  type: consts.SHOOT,
  mousePosition,
});

export const methods = {
  moveObjects: moveObjects,
  startGame: startGame,
  leaderboardLoaded: leaderboardLoaded,
  loggedIn: loggedIn,
  shoot: shoot
};
