import Insect from './Insect.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { ButterflyAnimationData } from '../../globals/WildlifeAnimations.js'
import Animation from '../../components/Animation.js'

export default class Butterfly extends Insect {
  init () {
    // hmm do we need to call the super() functions? something is going wrong
    this.buildAnimations()
    this.currentAnimation = this.getAnimation('Flying')
    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
    //console.log("Butterfly init complete. My animation is:",this.currentAnimation);
  }

  buildAnimations () {
    let animationData = ButterflyAnimationData
    const animationKeys = Object.keys(animationData)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, animationData[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = animationData[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(animationData[key].spritesheet)
      // omg this is so complex and convoluted
      //console.log("my img url is: "+animationData[key].spritesheet);
      //console.log("new butterfly with a canvas",config.canvas);
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }
}