import Forageable from './Forageable.js'
import ForageableAnimations from '../../globals/ForageableAnimations.js'
import ForageableData from '../../globals/ForageableData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class WildRose extends Forageable {
  constructor (config) {
    config.type = EntityTypes.WildRose
    config = {...config, ...ForageableData[EntityTypes.WildRose]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(ForageableAnimations[EntityTypes.WildRose])
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, ForageableAnimations[EntityTypes.WildRose][key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = ForageableAnimations[EntityTypes.WildRose][key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(ForageableAnimations[EntityTypes.WildRose][key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}