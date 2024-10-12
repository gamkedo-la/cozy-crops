import { Crops } from './Images.js'

export const Cabbage = {
  Seedling: {
    name: 'CabbageSeedling',
    spritesheet: Crops,
    frames: [2],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungSprout: {
    name: 'CabbageYoungSprout',
    spritesheet: Crops,
    frames: [3],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  Sprout: {
    name: 'CabbageSprout',
    spritesheet: Crops,
    frames: [4],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantIdle: {
    name: 'CabbageYoungPlantIdle',
    spritesheet: Crops,
    frames: [5],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  YoungPlantWind: {
    name: 'CabbageYoungPlantWind',
    spritesheet: Crops,
    frames: [5, 6, 7],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  MaturePlantIdle: {
    name: 'CabbageMaturePlantIdle',
    spritesheet: Crops,
    frames: [8],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  },
  MaturePlantWind: {
    name: 'CabbageMaturePlantWind',
    spritesheet: Crops,
    frames: [8, 9, 10],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: false
  },
  Dead: {
    name: 'CabbageDead',
    spritesheet: Crops,
    frames: [11],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

const CropAnimations = {
  Cabbage
}

export default CropAnimations
