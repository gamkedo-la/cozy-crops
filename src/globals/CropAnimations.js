import { ShortCrops } from './Images.js'

export const Cabbage = {
  Seedling: {
    name: 'CabbageSeedling',
    spritesheet: ShortCrops,
    frames: [2],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungSprout: {
    name: 'CabbageYoungSprout',
    spritesheet: ShortCrops,
    frames: [3],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  Sprout: {
    name: 'CabbageSprout',
    spritesheet: ShortCrops,
    frames: [4],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantIdle: {
    name: 'CabbageYoungPlantIdle',
    spritesheet: ShortCrops,
    frames: [5],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantWind: {
    name: 'CabbageYoungPlantWind',
    spritesheet: ShortCrops,
    frames: [5, 6, 7],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  MaturePlantIdle: {
    name: 'CabbageMaturePlantIdle',
    spritesheet: ShortCrops,
    frames: [8],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  MaturePlantWind: {
    name: 'CabbageMaturePlantWind',
    spritesheet: ShortCrops,
    frames: [8, 9, 10],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  Dead: {
    name: 'CabbageDead',
    spritesheet: ShortCrops,
    frames: [11],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Carrot = {
  Seedling: {
    name: 'CarrotSeedling',
    spritesheet: ShortCrops,
    frames: [44],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungSprout: {
    name: 'CarrotYoungSprout',
    spritesheet: ShortCrops,
    frames: [45],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  Sprout: {
    name: 'CarrotSprout',
    spritesheet: ShortCrops,
    frames: [46],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantIdle: {
    name: 'CarrotYoungPlantIdle',
    spritesheet: ShortCrops,
    frames: [47],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantWind: {
    name: 'CarrotYoungPlantWind',
    spritesheet: ShortCrops,
    frames: [47, 48, 49],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  MaturePlantIdle: {
    name: 'CarrotMaturePlantIdle',
    spritesheet: ShortCrops,
    frames: [50],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  MaturePlantWind: {
    name: 'CarrotMaturePlantWind',
    spritesheet: ShortCrops,
    frames: [50, 51, 52],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  Dead: {
    name: 'CarrotDead',
    spritesheet: ShortCrops,
    frames: [53],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const Onion = {
  Seedling: {
    name: 'OnionSeedling',
    spritesheet: ShortCrops,
    frames: [23],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungSprout: {
    name: 'OnionYoungSprout',
    spritesheet: ShortCrops,
    frames: [24],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  Sprout: {
    name: 'OnionSprout',
    spritesheet: ShortCrops,
    frames: [25],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantIdle: {
    name: 'OnionYoungPlantIdle',
    spritesheet: ShortCrops,
    frames: [26],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantWind: {
    name: 'OnionYoungPlantWind',
    spritesheet: ShortCrops,
    frames: [26, 27, 28],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  MaturePlantIdle: {
    name: 'OnionMaturePlantIdle',
    spritesheet: ShortCrops,
    frames: [29],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  MaturePlantWind: {
    name: 'OnionMaturePlantWind',
    spritesheet: ShortCrops,
    frames: [29, 30, 31],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  Dead: {
    name: 'OnionDead',
    spritesheet: ShortCrops,
    frames: [32],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

const CropAnimations = {
  Cabbage,
  Carrot,
  Onion
}

export default CropAnimations
