import { WildlifeSprites } from './Images.js'

export const ButterflyAnimationData = {
  Flying: {
    name: 'ButterflyFlying',
    spritesheet: WildlifeSprites,
    frames: [2],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 250,
    loop: true
  },
  Idle: {
    name: 'ButterflyIdle',
    spritesheet: WildlifeSprites,
    frames: [2],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 250,
    loop: true
  },
  Inventory: {
    name: 'ButterflyInventory',
    spritesheet: WildlifeSprites,
    frames: [2],
    frameWidth: 8,
    frameHeight: 8,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export default ButterflyAnimationData
