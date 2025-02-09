import CropAnimations from '../../globals/CropAnimations.js'
import Animation from '../../components/Animation.js'
import CropData from '../../globals/CropData.js'

export default class Crop {
  constructor (config) {
    Object.assign(this, config)

    this.growthStages = ['Seedling', 'YoungSprout', 'Sprout', 'YoungPlant', 'MaturePlant', 'Dead']
    this.currentGrowthStage = config.currentGrowthStage || 0
    this.currentGrowDays = 0
    this.width = 0 // Initialize once animations are built
    this.height = 0 // Initialize once animations are built
    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
    this.collisionPoint = {
      x: 0, // Initialize once animations are built
      y: 0 // Initialize once animations are built
    }
    this.wateredYesterday = true
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height

    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height / 2
    }
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  getGrowthStage () {
    if (this.currentGrowthStage < 0) {
      return 'Dead'
    } else {
      return this.growthStages[this.currentGrowthStage]
    }
  }

  advanceDay () {
    if (this.manager.isWatered(this) && this.currentGrowthStage >= 0) {
      this.wateredYesterday = true
      if (this.scene.getSeason() === this.inSeason) {
        this.currentGrowDays += 3
      } else {
        this.currentGrowDays++
      }

      if (this.currentGrowDays >= this.daysToGrow) {
        this.currentGrowthStage++
        if (this.currentGrowthStage >= this.growthStages.findIndex(stage => stage === 'Dead')) {
          this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'MaturePlant')
        }
      }
  
      this.currentAnimation = this.getAnimation()
    } else {
      if (!this.wateredYesterday) {
        this.currentGrowDays--
        if (this.currentGrowDays < 0) {
          this.currentGrowDays = this.daysToGrow
          this.currentGrowthStage--
          if (this.currentGrowthStage < 0) {
            this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'Dead')
          }
        }
        this.currentAnimation = this.getAnimation()
      }
      this.wateredYesterday = false
    }
  }

  harvest () {
    const quantity = this.scene.getSeason() === this.inSeason ? Math.floor(Math.random() * (this.maxInSeasonYield - this.minInSeasonYield + 1)) + this.minInSeasonYield : Math.floor(Math.random() * (this.maxOutOfSeasonYield - this.minOutOfSeasonYield + 1)) + this.minOutOfSeasonYield
    let seedQuantity = 0
    //if (Math.random() < this.chanceOfSeedDrop) {
    //  seedQuantity = Math.floor(Math.random() * (this.maxSeedQuantity - 1 + 1)) + 1
    //}
    return { quantity, seedQuantity }
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height / 2
    }
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }

  drawAsInventory (x, y, width, height) {
    const frame = this.animations['Inventory'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}