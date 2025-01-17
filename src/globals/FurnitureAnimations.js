import EntityTypes from './EntityTypes.js'
import { CarpentryItems } from './Images.js'

export const BedTwin = {
  Idle: {
    name: 'BedTwinIdle',
    spritesheet: CarpentryItems,
    // TODO: Need to revisit the Frame Data for these animations
    frames: [88],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    // END TODO
    duration: 500,
    loop: true
  }
}

const FurnitureAnimations = {
  [EntityTypes.BedTwin]: BedTwin
}

export default FurnitureAnimations