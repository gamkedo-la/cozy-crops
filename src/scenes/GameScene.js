import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.Game
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    draw(this)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function draw (scene) {
  scene.imageManager.draw(scene.imageManager.images.TileSet, 0, 0, 512, 512)
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes('Enter')) {
    if (scene.currentSelection === 'Start') {
      scene.game.changeScene(Scenes.Game)
    }
  }
}