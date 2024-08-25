import { CanvasClearColor } from '../globals/Constants.js'

export default class Scene {
  constructor (config) {
    Object.assign(this, config)
    Object.assign(this, config.managers)
  }

  start () {
  }

  update (deltaTime) {
    // deltaTime is the time between frames (milliseconds)
    this.draw()
  }

  draw () {
    this.game.ctx.fillStyle = CanvasClearColor
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
  }

  stop () {
    // clean up resources
  }
}