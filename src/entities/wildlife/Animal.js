// a simple entity that moves around a central point, 
// does not collide with anything or affect gameplay

import Animation from '../../components/Animation.js'

export default class Animal {
  
  constructor (config) {
    Object.assign(this, config)
    this.animations = {}
    this.currentAnimation = null
    this.age = 0
    this.spawnX = config.x
    this.spawnY = config.y
    this.wobbleSpeed = 32 + Math.random()*160
    this.wobbleWidth = 64 + Math.random()*256
    this.wobbleHeight = 8 + Math.random()*32
    this.flutterSpeed = 2048 + Math.random()*2048
    this.flutterHeight = 2 + Math.random()*4
    this.width = 1
    this.height = 1
    this.collisionPoint = { x: 0, y: 0 }
  }

  init () {
    // override this method in subclasses
  }

  // don't need to override
  buildAnimations (animationData) {
    let firstAnim = null
    const animationKeys = Object.keys(animationData)
    animationKeys.forEach((key, index) => { 
      const config = Object.assign({}, animationData[key]) 
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager 
      config.imageSrc = animationData[key].spritesheet 
      if (config.durationRandomness) config.duration = config.duration + ((Math.random() * config.durationRandomness) - config.durationRandomness/2)
      config.canvas = this.imageManager.getImageWithSrc(animationData[key].spritesheet)
      this.animations[key] = new Animation(config)
      if (!firstAnim) firstAnim = this.animations[key]
    })
    // fill in some values with whatever's in the data
    this.currentAnimation = firstAnim
    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height  
  }

  // no need to override
  getAnimation (type='Idle') {
    return this.animations[type]
  }

  update (deltaTime) {
    // override this method in subclasses
  }

  draw (camera) {
    if (this.currentAnimation) {
        this.currentAnimation.draw(this.x, this.y, camera) 
    } else {
        console.log("error: missing animation for an animal at "+this.x+","+this.y)
    }
  }

  drawAsInventory (x, y, width, height) {
    if (!this.currentAnimation || !this.currentAnimation.spritesheet || !this.animations['Inventory']) return
    const frame = this.animations['Inventory'].getCurrentFrame()
    if (frame) this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}