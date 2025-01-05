import EntityTypes from './EntityTypes.js'
import { TreeCrops } from './Images.js'

export const Apple = {
  Inventory: {
    name: 'Apple',
    spritesheet: TreeCrops,
    frames: [1],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Orange = {
  Inventory: {
    name: 'Orange',
    spritesheet: TreeCrops,
    frames: [12],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Lime = {
  Inventory: {
    name: 'Lime',
    spritesheet: TreeCrops,
    frames: [23],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Cherry = {
  Inventory: {
    name: 'Cherry',
    spritesheet: TreeCrops,
    frames: [34],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Lemon = {
  Inventory: {
    name: 'Lemon',
    spritesheet: TreeCrops,
    frames: [45],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Plum = {
  Inventory: {
    name: 'Plum',
    spritesheet: TreeCrops,
    frames: [89],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

const FruitAnimations = {
  [EntityTypes.Apple]: Apple,
  [EntityTypes.Orange]: Orange,
  [EntityTypes.Lime]: Lime,
  [EntityTypes.Cherry]: Cherry,
  [EntityTypes.Lemon]: Lemon,
  [EntityTypes.Plum]: Plum
}

export default FruitAnimations