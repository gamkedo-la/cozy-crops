import NPC from './NPC.js'
import { TiffanyAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Tiffany extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Tiffany
    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(TiffanyAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TiffanyAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TiffanyAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TiffanyAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}