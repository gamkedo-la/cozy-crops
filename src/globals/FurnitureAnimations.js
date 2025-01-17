import EntityTypes from './EntityTypes.js'
import { CarpentryItems } from './Images.js'

export const BedTwin = {
  Idle: {
    name: 'BedTwinIdle',
    spritesheet: CarpentryItems,
    x: 64,
    y: 0,
    width: 14,
    height: 14,
    padding: 1
  }
}

const FurnitureAnimations = {
  [EntityTypes.BedTwin]: BedTwin
}

export default FurnitureAnimations