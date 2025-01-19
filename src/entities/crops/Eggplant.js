import Crop from './Crop.js'
import CropAnimations from '../../globals/CropAnimations.js'
import CropData from '../../globals/CropData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Eggplant extends Crop {
  constructor (config) {
    config.type = EntityTypes.Eggplant
    config.seedType = EntityTypes.EggplantSeed
    config = {...config, ...CropData[EntityTypes.Eggplant]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(CropAnimations.Eggplant)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CropAnimations.Eggplant[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CropAnimations.Eggplant[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CropAnimations.Eggplant[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    if (this.currentGrowthStage < 0) {
      return this.animations['Dead']
    } else if (this.growthStages[this.currentGrowthStage] === 'YoungPlant' || this.growthStages[this.currentGrowthStage] === 'MaturePlant') {
      const key = this.growthStages[this.currentGrowthStage] + type
      return this.animations[key]
    } else {
      return this.animations[this.growthStages[this.currentGrowthStage]]
    }
  }
}