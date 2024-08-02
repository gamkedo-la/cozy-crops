import { CanvasScale } from '../globals/Constants.js'

export default class BootScene {
  constructor (config) {
    this.game = config.game
    this.loadingText = 'Loading'
    this.loadingTimer = 0
  }

  start (loader) {
    drawLoadingText(this, this.loadingText)
    loader.load()
  }

  update (deltaTime) {
    // deltaTime is the time between frames (milliseconds)
    this.loadingTimer += deltaTime

    if (this.loadingTimer > 500) {
      this.loadingTimer -= 500

      if (this.loadingText.length < 'Loading...'.length) {
        this.loadingText += '.'
      } else {
        this.loadingText = 'Loading'
      }

      drawLoadingText(this, this.loadingText)
    }
  }
}

function drawLoadingText(boot, text) {
  boot.game.ctx.fillStyle = 'black'
  boot.game.ctx.fillRect(0, 0, boot.game.canvas.width, boot.game.canvas.height)

  boot.game.ctx.font = '15px Arial'
  boot.game.ctx.fillStyle = 'white'
  boot.game.ctx.textAlign = 'left'
  boot.game.ctx.textBaseline = 'middle'
  boot.game.ctx.fillText(text, (boot.game.canvas.width / (2 * CanvasScale)) - 35, boot.game.canvas.height / (2 * CanvasScale))
}