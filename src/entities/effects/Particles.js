// simple particle effects

import { ParticleSprite } from "../../globals/Images.js"

export default class Particles {
  constructor (config) {
    Object.assign(this, config)
    this.age = 0
    this.particleImg = null
  }

  init () {
    this.particleImg = this.imageManager.getImageWithSrc(ParticleSprite)
  }

  update (deltaTime) {
    this.age += deltaTime
    console.log("particles update:"+" age:"+this.age.toFixed(0))
  }

  draw (camera) {
        // this.game.ctx.drawImage(this.particleImg,x,y)
  }

}