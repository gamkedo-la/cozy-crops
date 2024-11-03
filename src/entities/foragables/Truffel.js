import Forageable from './Forageable.js'
import ForageableAnimations from '../../globals/ForageableAnimations.js'
import ForageableData from '../../globals/ForageableData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Truffel extends Forageable {
  constructor (config) {
    config.type = EntityTypes.Truffel
    config = {...config, ...ForageableData[EntityTypes.Truffel]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(ForageableAnimations.Truffel)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, ForageableAnimations.Truffel[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = ForageableAnimations.Truffel[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(ForageableAnimations.Truffel[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}