import { WildlifeSprites } from './Images.js'

export const ButterflyAnimationData = {
  Flying: {
    name: 'ButterflyFlying',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 250, // ideally we could have a slightly different duration for each butterfly so they don't all synch up
    // Duration can be adjusted in the buildAnimations method of the Butterfly class so each butterfly has a slightly different duration
    loop: true
  },
  Idle: {
    name: 'ButterflyIdle',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 250,
    loop: true
  },
  Inventory: {
    name: 'ButterflyInventory',
    spritesheet: WildlifeSprites,
    frames: [0,1],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export default ButterflyAnimationData
