import TreeAnimations from '../../globals/TreeAnimations.js'
import Animation from '../../components/Animation.js'
import TreeData from '../../globals/TreeData.js'

export default class Tree {
  constructor (config) {
    Object.assign(this, config)

    this.growthStages = ['Sprout', 'YoungSapling', 'Sapling', 'YoungTree', 'MatureTree', 'FruitingTree', 'Dead', 'Stump']
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
      y: this.y + this.currentAnimation.height - 6 // special padding for trees based on spritesheet
    }
    setHealth(this)
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  advanceDay () {
    if (this.currentGrowthStage >= 0 && this.currentGrowthStage < this.growthStages.findIndex(stage => stage === 'MatureTree')) {
      if (this.manager.isWatered(this) && this.currentGrowthStage >= 0) {
        this.wateredYesterday = true
        this.currentGrowthStage++
        if (this.currentGrowthStage >= this.growthStages.length - 2) {
          this.currentGrowthStage = this.growthStages.length - 3
        }
    
        this.currentAnimation = this.getAnimation()
      } else {
        if (!this.wateredYesterday) {
          this.currentGrowthStage--
          this.currentAnimation = this.getAnimation()
        }
        this.wateredYesterday = false
      }  
    } else if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'MatureTree')) {
      this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'FruitingTree')
      this.currentAnimation = this.getAnimation()
    }

    setHealth(this) // recalculate health => heals any damage from yesterday
  }

  getGrowthStage () {
    if (this.currentGrowthStage < 0) {
      return 'Dead'
    } else {
      return this.growthStages[this.currentGrowthStage]
    }
  }

  chop (damage) {
    if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'Stump')) {
      return false
    }

    this.health -= damage

    if (this.health <= 0) {
      this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'Stump')
      this.currentAnimation = this.getAnimation()
      return true
    }

    return false
  }

  convertToStump () {
    this.currentGrowthStage = this.growthStages.length - 1
    this.currentAnimation = this.getAnimation()
  }

  harvestFruit () {
    // TODO: If this returned a number, it could be used to alter how much based on the season
    if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'FruitingTree')) {
      this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'MatureTree')
      this.currentAnimation = this.getAnimation()
      return true
    }

    return false
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2,
      y: this.y + this.currentAnimation.height - 6 // special padding for trees based on spritesheet
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

function setHealth (tree) {
  switch (tree.currentGrowthStage) {
    case 0:
      tree.health = Math.ceil(tree.health / 5)
      break
    case 1:
      tree.health = Math.ceil(tree.health / 4)
      break
    case 2:
      tree.health = Math.ceil(tree.health / 3)
      break
    case 3:
      tree.health = Math.ceil(tree.health / 2)
      break
    default:
      tree.health = tree.health
  }
}