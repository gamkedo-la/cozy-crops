import { WildlifeSprites } from './Images.js'

export const ButterflyAnimationData = {
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

export const BunnyAnimationData = {
  Idle: {
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
  Hopping: {
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
