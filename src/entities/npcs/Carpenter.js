import NPC from './NPC.js'
import { CarpenterAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Carpenter extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Carpenter
    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(CarpenterAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CarpenterAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CarpenterAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CarpenterAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}