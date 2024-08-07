import Constants from './globals/Constants.js'
import EventManager from './managers/EventManager.js'
import LoadManager from './managers/LoadManager.js'
import ImageManager from './managers/ImageManager.js'
import AudioManager from './managers/AudioManager.js'
import FontManager from './managers/FontManager.js'
import SceneManager from './managers/SceneManager.js'
import InputManager from './managers/InputManager.js'
import EntityManager from './managers/EntityManager.js'
import MapManager from './managers/MapManager.js'

export default class Game {
  constructor () {
    this.canvas = buildCanvas()
    this.ctx = buildContext(this.canvas)
    document.body.appendChild(this.canvas)

    this.lastTime = 0

    this.eventManager = null
    this.loadManager = null
    this.imageManager = null
    this.audioManager = null
    this.fontManager = null
    this.sceneManager = null
    this.inputManager = null
    this.entityManager = null
    this.mapManager = null
    buildManagers(this)

    this.start()
  }

  start () {
    // Do any one-time setup here, then call update()
    this.sceneManager.start()

    console.log("Cassidy New Test")

    this.update(this.lastTime)
  }

  update (timestamp) {
    // deltaTime is the time between frames (milliseconds)
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp
    this.sceneManager.update(deltaTime)
    this.inputManager.update(deltaTime)

    requestAnimationFrame(timestamp => this.update(timestamp))
  }

  changeScene (scene) {
    this.sceneManager.changeScene(scene)
  }
}

function buildCanvas () {
  const canvas = document.createElement('canvas')
  canvas.classList.add('centered-canvas')
  canvas.width = Constants.CanvasWidth
  canvas.height = Constants.CanvasHeight
  canvas.style.width = `${canvas.width * Constants.CanvasScale}px`
  canvas.style.height = `${canvas.height * Constants.CanvasScale}px`
  return canvas
}

function buildContext (canvas) {
  const ctx = canvas.getContext('2d')
  ctx.scale(Constants.CanvasScale, Constants.CanvasScale)
  ctx.imageSmoothingEnabled = false
  return ctx
}

function buildManagers (game) {
  game.eventManager = new EventManager({ game })

  const managerConfig = {
    game,
    eventManager: game.eventManager
  }

  game.entityManager = new EntityManager({ ...managerConfig })
  game.imageManager = new ImageManager({ ...managerConfig })
  game.mapManager = new MapManager({ ...managerConfig, imageManager: game.imageManager })
  game.audioManager = new AudioManager({ ...managerConfig })
  game.fontManager = new FontManager({ ...managerConfig })
  game.inputManager = new InputManager({ ...managerConfig })

  game.loadManager = new LoadManager({
    ...managerConfig,
    imageManager: game.imageManager,
    audioManager: game.audioManager,
    fontManager: game.fontManager
  })

  game.sceneManager = new SceneManager({
    game,
    managers: {
      loadManager: game.loadManager,
      eventManager: game.eventManager,
      imageManager: game.imageManager,
      audioManager: game.audioManager,
      fontManager: game.fontManager,
      inputManager: game.inputManager,
      entityManager: game.entityManager,
      mapManager: game.mapManager
    }
  })
}