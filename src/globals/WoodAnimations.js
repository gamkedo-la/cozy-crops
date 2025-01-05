import EntityTypes from './EntityTypes.js'
import { TreeCrops } from './Images.js'

export const Apple = {
  Log: {
    name: 'AppleLog',
    spritesheet: TreeCrops,
    frames: [10],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Orange = {
  Log: {
    name: 'OrangeLog',
    spritesheet: TreeCrops,
    frames: [21],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Lime = {
  Log: {
    name: 'LimeLog',
    spritesheet: TreeCrops,
    frames: [32],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Cherry = {
  Log: {
    name: 'CherryLog',
    spritesheet: TreeCrops,
    frames: [43],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Lemon = {
  Log: {
    name: 'LemonLog',
    spritesheet: TreeCrops,
    frames: [54],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Maple = {
  Log: {
    name: 'MapleLog',
    spritesheet: TreeCrops,
    frames: [65],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Oak = {
  Log: {
    name: 'OakLog',
    spritesheet: TreeCrops,
    frames: [76],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Pine = {
  Log: {
    name: 'PineLog',
    spritesheet: TreeCrops,
    frames: [87],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

export const Plum = {
  Log: {
    name: 'PlumLog',
    spritesheet: TreeCrops,
    frames: [98],
    frameWidth: 48,
    frameHeight: 48,
    padding: 0,
    duration: 500,
    loop: true
  }
}

const WoodAnimations = {
  [EntityTypes.AppleWood]: Apple,
  [EntityTypes.OrangeWood]: Orange,
  [EntityTypes.LimeWood]: Lime,
  [EntityTypes.CherryWood]: Cherry,
  [EntityTypes.LemonWood]: Lemon,
  [EntityTypes.MapleWood]: Maple,
  [EntityTypes.OakWood]: Oak,
  [EntityTypes.PineWood]: Pine,
  [EntityTypes.PlumWood]: Plum
}

export default WoodAnimations