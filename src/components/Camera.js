import { ImageScale } from '../globals/Constants.js'

export default class Camera {
  constructor (config) {
    Object.assign(this, config)
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
  }

  update (deltaTime) {
    // this.x = ((this.player1.x + (this.player2 ? this.player2.x : 0)) / 2)
    // this.y = ((this.player1.y + (this.player2 ? this.player2.y : 0)) / 2)
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
  }

  getTopLeft () {
    return {
      x: this.x,
      y: this.y
    }
  }
}