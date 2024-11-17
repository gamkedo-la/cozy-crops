import NPC from './NPC.js'
import { LumberjackAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Lumberjack extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Lumberjack
    this.dialogue = {
      // TODO: Remove this with the correct dialogue
      default: `Hello there! I'm the village lumberjack.\nI can help you with all your woodcutting needs.`
    }

    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(LumberjackAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, LumberjackAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = LumberjackAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(LumberjackAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}