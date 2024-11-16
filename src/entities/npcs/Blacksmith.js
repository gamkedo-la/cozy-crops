import NPC from './NPC.js'
import { BlacksmithAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Blacksmith extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Blacksmith
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
}