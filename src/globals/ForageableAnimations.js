import EntityTypes from './EntityTypes.js'
import { ForageableItems } from './Images.js'

// TODO: Need to revisit the Frame Data for these animations
// This was built before the image existed

export const Daffodil = {
  Inventory: {
    name: 'DaffodilInventory',
    spritesheet: ForageableItems,
    frames: [16],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'DaffodilWind',
    spritesheet: ForageableItems,
    frames: [17, 18, 19],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Sunflower = {
  Inventory: {
    name: 'SunflowerInventory',
    spritesheet: ForageableItems,
    frames: [0],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'SunflowerWind',
    spritesheet: ForageableItems,
    frames: [1, 2, 3, 2],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Truffel = {
  Inventory: {
    name: 'TruffelInventory',
    spritesheet: ForageableItems,
    frames: [12],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'TruffelWind',
    spritesheet: ForageableItems,
    frames: [13, 14, 15],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Tulip = {
  Inventory: {
    name: 'TulipInventory',
    spritesheet: ForageableItems,
    frames: [4],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'TulipWind',
    spritesheet: ForageableItems,
    frames: [5, 6, 7],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const WildGarlic = {
  Inventory: {
    name: 'WildGarlicInventory',
    spritesheet: ForageableItems,
    frames: [20],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'WildGarlicWind',
    spritesheet: ForageableItems,
    frames: [21, 22, 23],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const WildRose = {
  Inventory: {
    name: 'WildRoseInventory',
    spritesheet: ForageableItems,
    frames: [24],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  },
  Idle: {
    name: 'WildRoseWind',
    spritesheet: ForageableItems,
    frames: [25, 26, 27],
    frameWidth: 16,
    frameHeight: 34,
    padding: 1,
    duration: 500,
    loop: true
  }
}

const ForageableAnimations = {
  [EntityTypes.Daffodil]: Daffodil,
  [EntityTypes.Sunflower]: Sunflower,
  [EntityTypes.Truffel]: Truffel,
  [EntityTypes.Tulip]: Tulip,
  [EntityTypes.WildGarlic]: WildGarlic,
  [EntityTypes.WildRose]: WildRose
}

export default ForageableAnimations
