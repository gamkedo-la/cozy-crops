import { ImageScale } from '../globals/Constants.js'

export default class Camera {
  constructor (config) {
    Object.assign(this, config)
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
  }

  update (deltaTime) {
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)
  }

  sleep (callback)  {
    const duration = 500 // Duration of the fade in milliseconds
    const start = performance.now() // Start time of the fade
    const initialAlpha = 0 // Initial alpha value
    const finalAlpha = 1 // Final alpha value

    const fade = (timestamp) => {
      const elapsed = timestamp - start // Time elapsed since the start of the fade
      const progress = Math.min(elapsed / duration, 1) // Progress of the fade (0 to 1)
      const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress // Current alpha value

      this.imageManager.setOverlayAlpha(alpha)

      if (progress < 1) {
        // Continue the fade
        requestAnimationFrame(fade)
      } else {
        callback()
      }
    }

    // Start the fade
    requestAnimationFrame(fade)
  }

  wake (callback) {
    this.x = this.player1.x - this.imageManager.internalCanvas.width / (2 * ImageScale)
    this.y = this.player1.y - this.imageManager.internalCanvas.height / (2 * ImageScale)

    const duration = 500 // Duration of the fade in milliseconds
    const start = performance.now() // Start time of the fade
    const initialAlpha = 1 // Initial alpha value
    const finalAlpha = 0 // Final alpha value

    const fade = (timestamp) => {
      const elapsed = timestamp - start // Time elapsed since the start of the fade
      const progress = Math.min(elapsed / duration, 1) // Progress of the fade (0 to 1)
      const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress // Current alpha value

      this.imageManager.setOverlayAlpha(alpha)

      if (progress < 1) {
        // Continue the fade
        requestAnimationFrame(fade)
      } else {
        callback()
      }
    }

    // Start the fade
    requestAnimationFrame(fade)
  }

  getTopLeft () {
    return {
      x: this.x,
      y: this.y
    }
  }
}