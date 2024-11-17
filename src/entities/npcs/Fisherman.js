import NPC from './NPC.js'
import { FishermanAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Fisherman extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Fisherman
    this.dialogue = {
      // TODO: Remove this with the correct dialogue
      default: `Hello there! I'm the village fisherman.\nI can help you with all your fishing needs.`
    }

    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(FishermanAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, FishermanAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = FishermanAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(FishermanAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}