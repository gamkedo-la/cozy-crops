import Insect from './Insect.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { BeeAnimationData } from '../../globals/WildlifeAnimations.js'
import Animation from '../../components/Animation.js'

export default class Bee extends Insect {
  init () {
    this.buildAnimations()
    this.currentAnimation = this.getAnimation('Flying')
    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
    this.wobbleSpeed = 80 + Math.random()*16
    this.wobbleWidth = 128 + Math.random()*128
    this.wobbleHeight = 20 + Math.random()*20
    this.flutterSpeed = 2048 + Math.random()*256
    this.flutterHeight = 4 + Math.random()*8
    //console.log("Bee init complete. My animation is:",this.currentAnimation);
  }

  buildAnimations () {
    // BeeAnimationData is an object whose keys are the names of the animations and whose values are the animation configs
    let animationData = BeeAnimationData
    const animationKeys = Object.keys(animationData) // get the names of the animations as an array
    animationKeys.forEach((key, index) => { // iterate through the array of animation names so we can get the config for each animation and build the animation
      const config = Object.assign({}, animationData[key]) // get the animation config for the current animation name, use Object.assign to make a copy of the config

      // assign additional properties to the animation config
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager // make sure the animation has access to the image manager
      config.imageSrc = animationData[key].spritesheet // assign the image source to the animation config

      // randomize the framerate so butterflies don't all flap in synch
      config.duration = config.duration + ((Math.random() * 100) - 50)

      // get the image from the image manager using the image source from the animation config
      config.canvas = this.imageManager.getImageWithSrc(animationData[key].spritesheet)

      // create a new Animation object using the config and assign it to the animations object using the same key as exists in the ButterflyAnimationData object
      this.animations[key] = new Animation(config)
    })
  }

}