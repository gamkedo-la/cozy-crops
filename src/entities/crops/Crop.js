import Animations from '../../globals/Animations.js'
import Animation from '../../components/Animation.js'

export default class Crop {
  constructor (config) {
    Object.assign(this, config)

    this.growthStages = ['Seedling', 'YoungSprout', 'Sprout', 'YoungPlant', 'MaturePlant', 'Dead']
    this.currentGrowthStage = config.currentGrowthStage || 0
    this.width = 0 // Initialize once animations are built
    this.height = 0 // Initialize once animations are built
    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }
}