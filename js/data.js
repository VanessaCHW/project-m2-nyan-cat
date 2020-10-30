// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 825//375;
const GAME_HEIGHT = 630//670//500;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50//116;//156;
let MAX_ENEMIES = 3;
let MAX_LEFT_ENEMIES = 2;

const LEFT_ENEMY_WIDTH = 50;
const LEFT_ENEMY_HEIGHT = 50;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 75;

const PLAYER_MAX_HEALTH = 5; 

let speedIncrement = 0.1;
let timeForItem = 0;
let delayItem = 400;