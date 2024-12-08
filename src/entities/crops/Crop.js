import CropAnimations from '../../globals/CropAnimations.js'
import Animation from '../../components/Animation.js'
import CropData from '../../globals/CropData.js'

export default class Crop {
  constructor (config) {
    Object.assign(this, config)

    this.growthStages = ['Seedling', 'YoungSprout', 'Sprout', 'YoungPlant', 'MaturePlant', 'Dead']
    this.currentGrowthStage = config.currentGrowthStage || 0
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
      y: this.y + this.currentAnimation.height
    }
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  advanceDay () {
    if (this.manager.isWatered(this) && this.currentGrowthStage >= 0) {
      this.wateredYesterday = true
      this.currentGrowthStage++
      if (this.currentGrowthStage >= this.growthStages.length - 1) {
        this.currentGrowthStage = this.growthStages.length - 2
      }
  
      this.currentAnimation = this.getAnimation()
    } else {
      if (!this.wateredYesterday) {
        this.currentGrowthStage--
        this.currentAnimation = this.getAnimation()
      }
      this.wateredYesterday = false
    }
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height
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