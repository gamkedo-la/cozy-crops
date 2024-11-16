import NPC from './NPC.js'
import { LumberjackAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Lumberjack extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Lumberjack
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