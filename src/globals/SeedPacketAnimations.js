import EntityTypes from './EntityTypes.js'
import { ShortCrops, TallCrops, TreeCrops } from './Images.js'

export const Carrot = {
  Inventory: {
    name: 'CarrotSeedPacket',
    spritesheet: ShortCrops,
    frames: [24],
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
    frames: [30],
    frameWidth: 16,
    frameHeight: 32,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Eggplant = {
  Inventory: {
    name: 'EggplantSeedPacket',
    spritesheet: TallCrops,
    frames: [15],
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
    frames: [12],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Pepper = {
  Inventory: {
    name: 'PepperSeedPacket',
    spritesheet: TallCrops,
    frames: [0],
    frameWidth: 16,
    frameHeight: 32,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Potato = {
  Inventory: {
    name: 'PotatoSeedPacket',
    spritesheet: ShortCrops,
    frames: [72],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Pumpkin = {
  Inventory: {
    name: 'PumpkinSeedPacket',
    spritesheet: ShortCrops,
    frames: [60],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Radish = {
  Inventory: {
    name: 'RadishSeedPacket',
    spritesheet: ShortCrops,
    frames: [84],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Strawberry = {
  Inventory: {
    name: 'StrawberrySeedPacket',
    spritesheet: TallCrops,
    frames: [45],
    frameWidth: 16,
    frameHeight: 32,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Tomato = {
  Inventory: {
    name: 'TomatoSeedPacket',
    spritesheet: ShortCrops,
    frames: [36],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Watermelon = {
  Inventory: {
    name: 'WatermelonSeedPacket',
    spritesheet: ShortCrops,
    frames: [48],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Apple = {
  Inventory: {
    name: 'AppleSeedPacket',
    spritesheet: TreeCrops,
    frames: [0],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Orange = {
  Inventory: {
    name: 'OrangeSeedPacket',
    spritesheet: TreeCrops,
    frames: [10],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Lime = {
  Inventory: {
    name: 'LimeSeedPacket',
    spritesheet: TreeCrops,
    frames: [20],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Cherry = {
  Inventory: {
    name: 'CherrySeedPacket',
    spritesheet: TreeCrops,
    frames: [30],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Lemon = {
  Inventory: {
    name: 'LemonSeedPacket',
    spritesheet: TreeCrops,
    frames: [40],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Maple = {
  Inventory: {
    name: 'MapleSeedPacket',
    spritesheet: TreeCrops,
    frames: [50],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Oak = {
  Inventory: {
    name: 'OakSeedPacket',
    spritesheet: TreeCrops,
    frames: [60],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Pine = {
  Inventory: {
    name: 'PineSeedPacket',
    spritesheet: TreeCrops,
    frames: [70],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

export const Plum = {
  Inventory: {
    name: 'PlumSeedPacket',
    spritesheet: TreeCrops,
    frames: [80],
    frameWidth: 16,
    frameHeight: 16,
    padding: 16,
    duration: 500,
    loop: true
  }
}

const SeedPacketAnimations = {
  [EntityTypes.CarrotSeed]: Carrot,
  [EntityTypes.CornSeed]: Corn,
  [EntityTypes.EggplantSeed]: Eggplant,
  [EntityTypes.LettuceSeed]: Lettuce,
  [EntityTypes.OnionSeed]: Onion,
  [EntityTypes.PepperSeed]: Pepper,
  [EntityTypes.PotatoSeed]: Potato,
  [EntityTypes.PumpkinSeed]: Pumpkin,
  [EntityTypes.RadishSeed]: Radish,
  [EntityTypes.StrawberrySeed]: Strawberry,
  [EntityTypes.TomatoSeed]: Tomato,
  [EntityTypes.WatermelonSeed]: Watermelon,
  [EntityTypes.AppleSeed]: Apple,
  [EntityTypes.OrangeSeed]: Orange,
  [EntityTypes.LimeSeed]: Lime,
  [EntityTypes.CherrySeed]: Cherry,
  [EntityTypes.LemonSeed]: Lemon,
  [EntityTypes.MapleSeed]: Maple,
  [EntityTypes.OakSeed]: Oak,
  [EntityTypes.PineSeed]: Pine,
  [EntityTypes.PlumSeed]: Plum
}

export default SeedPacketAnimations
