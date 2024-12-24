import NPC from './NPC.js'
import { BlacksmithAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Blacksmith extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Blacksmith
    this.dialogue = {
      default: `Hello there! I'm the village blacksmith.\nI can help you with all your tool needs.\nAre you here to Buy or Sell something?`,
      bought: `Thank you for your purchase!`,
      canceledBuy: `No problem! Let me know if you need anything.`,
      sold: `Thank you for bringing this in! I'm sure someone will be happy to have it.`,
      canceledSell: `No problem! Let me know if you need anything.`
    }

    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(BlacksmithAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, BlacksmithAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = BlacksmithAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(BlacksmithAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  getDialogue (state) {
    switch (state) {
      case 'bought':
        return this.dialogue.bought
      case 'canceledBuy':
        return this.dialogue.canceledBuy
      case 'sold':
        return this.dialogue.sold
      case 'canceledSell':
        return this.dialogue.canceledSell
      default:
        return this.dialogue.default
    }
  }
}