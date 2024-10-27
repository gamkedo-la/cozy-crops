import { ImageScale } from '../globals/Constants.js'

export default class Camera {
  constructor (config) {
    Object.assign(this, config)
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
    this.isSleeping = false
  }

  update (deltaTime) {
    if (!this.isSleeping) {
      this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
      this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
    }
  }

  async sleep (caller)  {
    console.log(`Camera sleep called by ${caller}`)

    this.isSleeping = true
    await this.imageManager.fadeToBlack()

    caller.cameraDidSleep()
  }

  async wake (caller) {
    console.log(`Camera wake called by ${caller}`)

    this.isSleeping = false
    await this.imageManager.fadeToBlack()

    caller.cameraDidWake()
  }

  getTopLeft () {
    return {
      x: this.x,
      y: this.y
    }
  }
}