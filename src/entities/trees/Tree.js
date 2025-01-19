import TreeAnimations from '../../globals/TreeAnimations.js'
import Animation from '../../components/Animation.js'
import TreeData from '../../globals/TreeData.js'
import EntityTypes from '../../globals/EntityTypes.js'
import Fruit from '../crops/Fruit.js'
import Wood from '../crops/Wood.js'

export default class Tree {
  constructor (config) {
    Object.assign(this, config)

    this.growthStages = ['Sprout', 'YoungSapling', 'Sapling', 'YoungTree', 'MatureTree', 'FruitingTree', 'DeadTree', 'Stump']
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

    if (!this.isFruitingType()) this.growthStages.splice(this.growthStages.findIndex(stage => stage === 'FruitingTree'), 1)

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
      // This is a growing tree, so it needs to be watered
      if (this.manager.isWatered(this) && this.currentGrowthStage >= 0) {
        this.wateredYesterday = true
        if (this.scene.getSeason() === this.inSeason) {
          this.currentGrowDays += 3
        } else {
          this.currentGrowDays++
        }

        if (this.currentGrowDays >= this.daysToGrow) {
          this.currentGrowDays = 0
          this.currentGrowthStage++
          if (this.currentGrowthStage >= this.growthStages.findIndex(stage => stage === 'DeadTree')) {
            this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'MatureTree')
          }
    
          this.currentAnimation = this.getAnimation()
        }
      } else {
        if (!this.wateredYesterday) {
          this.currentGrowDays--
          if (this.currentGrowDays < 0) {
            this.currentGrowDays = this.daysToGrow
            this.currentGrowthStage--
            if (this.currentGrowthStage < 0) {
              this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'DeadTree')
            }
            this.currentAnimation = this.getAnimation()
          }
        }
        this.wateredYesterday = false
      }  
    } else if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'MatureTree')) {
      // This is a mature tree, so it can fruit (if it fruits). Either way, it doesn't need to be watered
      if (this.isFruitingType()) {
        this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'FruitingTree')
        this.currentAnimation = this.getAnimation()  
      }
    }

    setHealth(this) // recalculate health => heals any damage from yesterday
  }

  getGrowthStage () {
    if (this.currentGrowthStage < 0) {
      return 'DeadTree'
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
    this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'Stump')
    this.currentAnimation = this.getAnimation()
  }

  harvestFruit () { // return quantity of fruit harvested
    if (!this.isFruitingType()) return 0

    if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'FruitingTree')) {
      this.currentGrowthStage = this.growthStages.findIndex(stage => stage === 'MatureTree')
      this.currentAnimation = this.getAnimation()
      return 1
    }

    return 0
  }

  isFruiting () {
    if (!this.isFruitingType()) return false
    if (this.currentGrowthStage === this.growthStages.findIndex(stage => stage === 'FruitingTree')) {
      return true
    }
    return false
  }

  isFruitingType () {
    switch (this.type) {
      case EntityTypes.AppleTree:
      case EntityTypes.OrangeTree:
      case EntityTypes.LimeTree:
      case EntityTypes.CherryTree:
      case EntityTypes.LemonTree:
      case EntityTypes.PlumTree:
        return true
      default:
        return false
    }
  }

  getFruit () {
    if (!this.isFruitingType()) return null

    const fruit = new Fruit({
      game: this.game,
      imageManager: this.imageManager,
      type: fruitTypeForTreeType(this),
      x: this.x + this.width - this.itemWidth - 28,
      y: this.y + 28 - this.itemHeight,
      width: 2 * this.itemWidth,
      height: 2 * this.itemHeight,
      quantity: 1
    })
    fruit.init()

    return fruit
  }

  getWood () {
    const wood = new Wood({
      game: this.game,
      imageManager: this.imageManager,
      type: woodTypeForTreeType(this),
      x: this.x + this.width - this.itemWidth - 28,
      y: this.y + 28 - this.itemHeight,
      width: 2 * this.itemWidth,
      height: 2 * this.itemHeight,
      quantity: this.woodCount
    })
    wood.init()

    return wood
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
    if (!this.currentAnimation) {
      console.log('No current animation for tree')
    }
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

function fruitTypeForTreeType (tree) {
  switch (tree.type) {
    case EntityTypes.AppleTree:
      return EntityTypes.Apple
    case EntityTypes.OrangeTree:
      return EntityTypes.Orange
    case EntityTypes.LimeTree:
      return EntityTypes.Lime
    case EntityTypes.CherryTree:
      return EntityTypes.Cherry
    case EntityTypes.LemonTree:
      return EntityTypes.Lemon
    case EntityTypes.PlumTree:
      return EntityTypes.Plum
  }
}

function woodTypeForTreeType (tree) {
  switch (tree.type) {
    case EntityTypes.AppleTree:
      return EntityTypes.AppleWood
    case EntityTypes.OrangeTree:
      return EntityTypes.OrangeWood
    case EntityTypes.LimeTree:
      return EntityTypes.LimeWood
    case EntityTypes.CherryTree:
      return EntityTypes.CherryWood
    case EntityTypes.LemonTree:
      return EntityTypes.LemonWood
    case EntityTypes.PlumTree:
      return EntityTypes.PlumWood
    case EntityTypes.MapleTree:
      return EntityTypes.MapleWood
    case EntityTypes.OakTree:
      return EntityTypes.OakWood
    case EntityTypes.PineTree:
      return EntityTypes.PineWood
  }
}