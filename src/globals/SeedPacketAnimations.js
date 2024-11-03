import EntityTypes from './EntityTypes.js'
import { ShortCrops, TallCrops } from './Images.js'

export const Carrot = {
  Inventory: {
    name: 'CarrotSeedPacket',
    spritesheet: ShortCrops,
    frames: [42],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Corn = {
  Inventory: {
    name: 'CornSeedPacket',
    spritesheet: TallCrops,
    frames: [42],
    frameWidth: 16,
    frameHeight: 32,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Lettuce = {
  Inventory: {
    name: 'LettuceSeedPacket',
    spritesheet: ShortCrops,
    frames: [0],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Onion = {
  Inventory: {
    name: 'OnionSeedPacket',
    spritesheet: ShortCrops,
    frames: [21],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

const SeedPacketAnimations = {
  [EntityTypes.CarrotSeed]: Carrot,
  [EntityTypes.CornSeed]: Corn,
  [EntityTypes.LettuceSeed]: Lettuce,
  [EntityTypes.OnionSeed]: Onion
}

export default SeedPacketAnimations
