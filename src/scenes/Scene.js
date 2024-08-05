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
    draw(this)
  }

  stop () {
    // clean up resources
  }
}

function draw (scene) {
  scene.game.ctx.fillStyle = CanvasClearColor
  scene.game.ctx.fillRect(0, 0, scene.game.canvas.width, scene.game.canvas.height)
}