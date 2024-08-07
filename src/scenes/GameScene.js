import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.Game
    
    this.drawList = []
  }

  addEntity (entity) {
    insertEntity(this, entity)
  }

  start () {
    this.mapManager.start()
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
  // scene.imageManager.draw(scene.imageManager.images.TileSet, 0, 0, 512, 512)
  scene.mapManager.drawMap()
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes('Enter')) {
    if (scene.currentSelection === 'Start') {
      scene.game.changeScene(Scenes.Game)
    }
  }
}

function insertEntity (scene, entity) {
  let low = 0
  let high = scene.drawList.length

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (scene.drawList[mid].y < entity.y) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  scene.drawList.splice(low, 0, entity)
}