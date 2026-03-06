/*
  Week 6 — Example 1: Sprites, Sprite Sheets, & Animation

  Course: GBDA302 | Instructors: Dr. Karen Cochrane & David Han
  Date: Feb. 26, 2026

  Controls:
    A or D (Left / Right Arrow)   Horizontal movement
    W (Up Arrow)                  Jump
    S (Down Arrow)                Idle
    Space Bar                     Attack
 
*/

let player;
let playerImg;
let fire, fireImg;
let tilesetGround, tilesImg;

let playerAnis = {
  idle: { row: 1, frames: 4, frameDelay: 10 }, // middle row
  run: { row: 0, frames: 6, frameDelay: 3 }, // top row
  jump: { row: 2, frames: 3, frameDelay: 8, frame: 0 }, // bottom row
};

// level constants
const VIEWW = 320,
  VIEWH = 180;

// size of individual animation frames
const FRAME_W = 32,
  FRAME_H = 32;

// gravity
const GRAVITY = 0;

function preload() {
  // --- IMAGES ---
  playerImg = loadImage("assets/catplayer.png");
  fireImg = loadImage("assets/fire.png");
  tilesetGround = loadImage("assets/tilesetGround.png"); // load your tileset
}

function setup() {
  // pixelated rendering with autoscaling
  new Canvas(VIEWW, VIEWH, "pixelated");

  // correct visual artifacts
  allSprites.pixelPerfect = true;

  world.gravity.y = GRAVITY;

  // --- PLAYER ---
  player = new Sprite(VIEWW / 2, VIEWH / 2, FRAME_W, FRAME_H);
  player.spriteSheet = playerImg;
  player.rotationLock = true;
  player.anis.w = FRAME_W;
  player.anis.h = FRAME_H;
  player.anis.offset.y = -4;
  player.addAnis(playerAnis);
  player.ani = "idle";
  player.w = 18;
  player.h = 20;
  player.removeColliders();
  player.friction = 0;
  player.bounciness = 0;

  // --- FIRE ENEMY ---
  fire = new Sprite(200, VIEWH / 2, 16, 16);
  fire.spriteSheet = fireImg;
  fire.rotationLock = true;
  fire.addAnis({
    idle: { row: 0, frames: 4, frameDelay: 12 },
  });
  fire.ani = "idle";
}

function draw() {
  // --- BACKGROUND ---
  background("skyblue");

  // --- DRAW GROUND TILES ---
  // assume tiles are 32x32
  for (let x = 0; x < VIEWW; x += 32) {
    image(tilesetGround, x, VIEWH - 32, 32, 32);
  }

  // --- PLAYER CONTROLS ---
  if (kb.presses("up")) {
    player.ani = "jump";
  } else if (kb.presses("right")) {
    player.ani = "run";
    player.mirror.x = false;
  } else if (kb.presses("left")) {
    player.ani = "run";
    player.mirror.x = true;
  } else if (kb.presses(" ")) {
    player.ani = "attack";
  } else if (kb.presses("down")) {
    player.ani = "idle";
  }
}
