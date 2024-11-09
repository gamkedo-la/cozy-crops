import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Curator from '../entities/npcs/Curator.js'

export default class MuseumScene extends Scene {
  constructor (config) {
    super(config)

    this.curator = null
    this.museumCamera = null
  }

  start () {
    super.start() // Call the start method of the parent class

    // initialize resources
    this.curator = new Curator({
      game: this.game,
      imageManager: this.imageManager,
      x: 300,
      y: 150
    })
    this.curator.init()

    this.museumCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.curator.update(deltaTime)
    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('museum', { x: null, y: null })
    this.curator.draw(this.museumCamera)

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Go back to the game scene
    scene.game.changeScene(Scenes.Game)
  }
}