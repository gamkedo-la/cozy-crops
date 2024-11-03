import Forageable from './Forageable.js'
import ForageableAnimations from '../../globals/ForageableAnimations.js'
import ForageableData from '../../globals/ForageableData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Daffodil extends Forageable {
  constructor (config) {
    config.type = EntityTypes.Daffodil
    config = {...config, ...ForageableData[this.type]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(ForageableAnimations.Daffodil)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, ForageableAnimations.Daffodil[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = ForageableAnimations.Daffodil[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(ForageableAnimations.Daffodil[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}