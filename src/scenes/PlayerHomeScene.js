import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'

export default class PlayerHomeScene extends Scene {
  constructor (config) {
    super(config)
  }

  init () {
    super.init() // Call the init method of the parent class

    // initialize resources
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this

      // replace these with the player's home coordinates
      // this.player.x = MuseumEntrance.x
      // this.player.y = MuseumEntrance.y
    }
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