import Fish from './Fish.js'
import FishIconData from '../../globals/FishIconData.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { TileHeight } from '../../globals/Constants.js'

export default class UncaughtFish extends Fish {
  constructor (config) {
    config.type = EntityTypes.UnknownFish
    super(config)

    this.timeInDirection = Math.random() * 1000
    this.currentTimeInDirection = 0
    this.direction = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
  }

  init () {
    this.animation = FishIconData[this.type]
    this.animation.canvas = this.imageManager.getImageWithSrc(this.animation.spritesheet)
  }

  update (deltaTime) {
    this.currentTimeInDirection += deltaTime

    const dx = this.bobber.x - this.x
    const dy = this.bobber.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= TileHeight) {
      this.bobber.showWaterAnimation(true)
    } else {
      this.bobber.showWaterAnimation(false)
    }

    if (this.currentTimeInDirection >= this.timeInDirection) {
      // New direction should be toward the bobber with a little bit of randomness
      this.direction = { x: dx / distance + (Math.random() - 0.5) / 2, y: dy / distance + (Math.random() - 0.5) / 2 }
      this.timeInDirection = Math.random() * 1000
      this.currentTimeInDirection = 0
    }

    this.x += this.direction.x
    this.y += this.direction.y
  }
}