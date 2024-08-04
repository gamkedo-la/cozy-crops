export default class Scene {
  constructor (config) {
    Object.assign(this, config)
    Object.assign(this, config.managers)
  }

  start () {
  }

  update (deltaTime) {
    // deltaTime is the time between frames (milliseconds)
  }

  stop () {
    // clean up resources
  }
}