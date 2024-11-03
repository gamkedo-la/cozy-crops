import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'

export default class PlayerHomeScene extends Scene {
  constructor (config) {
    super(config)
  }

  start () {
    super.start() // Call the start method of the parent class

    // initialize resources
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}