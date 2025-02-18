import { WildlifeSprites } from './Images.js'

export const ButterflyAnimationData = {
  flyLeft: {
    flipped: false,
    name: 'flyLeft',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 100,
    loop: true,
  },
  flyRight: {
    flipped: true,
    name: 'flyRight',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 100,
    loop: true,
  },
  Flying: {
    name: 'ButterflyFlying',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 100,
    loop: true
  },
  Idle: {
    name: 'ButterflyIdle',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 100,
    loop: true
  },
  Inventory: {
    name: 'ButterflyInventory',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 500,
    durationRandomness: 100,
    loop: true
  }
}

export const BeeAnimationData = {
  flyLeft: {
    flipped: true,
    name: 'flyLeft',
    spritesheet: WildlifeSprites,
    frames: [16,17],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 80,
    durationRandomness: 0,
    loop: true,
  },
  flyRight: {
    flipped: false,
    name: 'flyRight',
    spritesheet: WildlifeSprites,
    frames: [16,17],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 80,
    durationRandomness: 0,
    loop: true,
  },
  Flying: {
    name: 'BeeFlying',
    spritesheet: WildlifeSprites,
    frames: [16,17],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 80,
    durationRandomness: 0,
    loop: true
  },
  Idle: {
    name: 'BeeIdle',
    spritesheet: WildlifeSprites,
    frames: [16,17],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 80,
    durationRandomness: 0,
    loop: true
  },
  Inventory: {
    name: 'BeeInventory',
    spritesheet: WildlifeSprites,
    frames: [16,17],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 8888,
    durationRandomness: 0,
    loop: true
  }
}

export const BunnyAnimationData = {
  IdleLeft: {
    name: 'BunnyIdle',
    spritesheet: WildlifeSprites,
    frames: [8,8,8,8,8,8,8,9,8,8,8,8,8,8,8,8,8, // blink
        10,11,10,8,8,8,8,8,8,8,8,8, // wiggle tail
        8,8,8,8,8,8,12,12,8,8,8,8,8, // wiggle nose
        8,8,8,13,13,13,13,13,8,12,8,12,8,12, // get grass, chew it
        ],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 50,
    loop: true
  },
  IdleRight: {
    name: 'BunnyIdle',
    spritesheet: WildlifeSprites,
    frames: [8,8,8,8,8,8,8,9,8,8,8,8,8,8,8,8,8, // blink
        10,11,10,8,8,8,8,8,8,8,8,8, // wiggle tail
        8,8,8,8,8,8,12,12,8,8,8,8,8, // wiggle nose
        8,8,8,13,13,13,13,13,8,12,8,12,8,12, // get grass, chew it
        ],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 50,
    loop: true,
    flipped: true
  },
  HoppingLeft: {
    name: 'BunnyHopping',
    spritesheet: WildlifeSprites,
    frames: [5,15,15,15,15,15,15,15,15,15,15,5],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 50,
    loop: true
  },
  HoppingRight: {
    name: 'BunnyHopping',
    spritesheet: WildlifeSprites,
    frames: [5,15,15,15,15,15,15,15,15,15,15,5],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 50,
    loop: true,
    flipped: true
  },
  Inventory: {
    name: 'BunnyInventory',
    spritesheet: WildlifeSprites,
    frames: [8,8,8,8,8,8,8,8,8,8,8,9,8,8,8,8,8,9],
    frameWidth: 16,
    frameHeight: 16,
    padding: 0,
    duration: 250,
    durationRandomness: 50,
    loop: true
  }
}

export default ButterflyAnimationData
