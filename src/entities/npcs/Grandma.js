import NPC from './NPC.js'
import { GrandmaAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Grandma extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Grandma
    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(GrandmaAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, GrandmaAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = GrandmaAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(GrandmaAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}