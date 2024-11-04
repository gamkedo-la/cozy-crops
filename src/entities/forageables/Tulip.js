import Forageable from './Forageable.js'
import ForageableAnimations from '../../globals/ForageableAnimations.js'
import ForageableData from '../../globals/ForageableData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Tulip extends Forageable {
  constructor (config) {
    config.type = EntityTypes.Tulip
    config = {...config, ...ForageableData[EntityTypes.Tulip]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(ForageableAnimations[EntityTypes.Tulip])
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, ForageableAnimations[EntityTypes.Tulip][key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = ForageableAnimations[EntityTypes.Tulip][key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(ForageableAnimations[EntityTypes.Tulip][key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}