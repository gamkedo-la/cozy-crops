import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Curator from '../entities/npcs/Curator.js'
import { MuseumEntrance, MuseumPosition } from '../globals/MuseumMap.js'
import EntityTypes from '../globals/EntityTypes.js'
import Plaque from '../entities/museum/Plaque.js'

export default class MuseumScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.curator = null
    this.museumCamera = null
  }

  init () {
    super.init() // Call the init method of the parent class

    // initialize resources
    this.curator = new Curator({
      game: this.game,
      imageManager: this.imageManager,
      x: 300,
      y: 150
    })
    this.curator.init()

    this.plaques = buildPlaques(this)

    this.museumCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this
      this.player.x = MuseumEntrance.x
      this.player.y = MuseumEntrance.y
    }

    // TODO: Get the status of all Plaques, Portraits, and Statues from the Game Manager
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.curator.update(deltaTime)
    if (this.player) this.player.update(deltaTime)
    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('museum', { x: null, y: null })
    this.plaques.forEach(plaque => plaque.draw(this.museumCamera))
    this.curator.draw(this.museumCamera)
    if (this.player) this.player.draw(this.museumCamera)

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + MuseumPosition.x, newPosition.y + MuseumPosition.y, this.mapManager.museumData)
    if (!tileIndex) {
      returnToWorld(this)
    } else {
      return this.mapManager.collisionManager.playerCanWalk(tileIndex)  
    }
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Go back to the game scene
    scene.player.x = scene.playerWorldPosition.x
    scene.player.y = scene.playerWorldPosition.y
    scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
    scene.game.changeScene(Scenes.Game)
  }
}

function returnToWorld (scene) {
  scene.player.x = scene.playerWorldPosition.x
  scene.player.y = scene.playerWorldPosition.y
  scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
  scene.game.changeScene(Scenes.Game)
}

function buildPlaques (scene) {
  const plaques = []
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFarming,
    complete: false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFishing,
    complete: false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueForaging,
    complete: false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFurniture,
    complete: false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueSelling,
    complete: false
  }))

  return plaques
}