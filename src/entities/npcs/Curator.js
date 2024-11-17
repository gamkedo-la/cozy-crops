import NPC from './NPC.js'
import { CuratorAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Curator extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Curator
    this.dialogue = {
      // TODO: Remove this with the correct dialogue
      default: `Hello there! I'm the Museum Curator.\nI can help you with all your museum needs.`
    }

    this.collisionPoint = { x: 0, y: 0 }
  }

  buildAnimations () {
    const animationKeys = Object.keys(CuratorAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, CuratorAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = CuratorAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(CuratorAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}