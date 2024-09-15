import Constants from './globals/Constants.js'
import GameManager from './managers/GameManager.js'
import EventManager from './managers/EventManager.js'
import LoadManager from './managers/LoadManager.js'
import ImageManager from './managers/ImageManager.js'
import AudioManager from './managers/AudioManager.js'
import FontManager from './managers/FontManager.js'
import SceneManager from './managers/SceneManager.js'
import InputManager from './managers/InputManager.js'
import EntityManager from './managers/EntityManager.js'
import MapManager from './managers/MapManager.js'
import CalendarManager from './managers/CalendarManager.js'

export default class Game {
  /**
   * Creates an instance of Game.
   * Initializes the canvas, context, and various managers.
   */
  constructor () {
    this.canvas = buildCanvas()
    this.ctx = buildContext(this.canvas)
    document.body.appendChild(this.canvas)

    this.lastTime = 0

    this.gameManager = null
    this.eventManager = null
    this.loadManager = null
    this.imageManager = null
    this.audioManager = null
    this.fontManager = null
    this.sceneManager = null
    this.inputManager = null
    this.entityManager = null
    this.mapManager = null
    this.calendarManager = null
    buildManagers(this)
  }

  /**
   * The primary game canvas.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D rendering context for the game canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The timestamp of the last frame. Used to calculate deltaTime for the update function.
   * @type {number}
   */
  lastTime;

  /**
   * The event manager for handling game events. There should only be one instance of this class.
   * @type {EventManager|null}
   */
  eventManager;

  /**
   * The load manager for handling game assets loading. There should only be one instance of this class.
   * @type {LoadManager|null}
   */
  loadManager;

  /**
   * The image manager for handling game images.  There should only be one instance of this class.
   * @type {ImageManager|null}
   */
  imageManager;

  /**
   * The audio manager for handling game audio.  There should only be one instance of this class.
   * @type {AudioManager|null}
   */
  audioManager;

  /**
   * The font manager for handling game fonts.  There should only be one instance of this class.
   * @type {FontManager|null}
   */
  fontManager;

  /**
   * The scene manager for handling game scenes.  There should only be one instance of this class.
   * @type {SceneManager|null}
   */
  sceneManager;

  /**
   * The input manager for handling user input.  There should only be one instance of this class.
   * @type {InputManager|null}
   */
  inputManager;

  /**
   * The entity manager for handling game entities.  There should only be one instance of this class.
   * @type {EntityManager|null}
   */
  entityManager;

  /**
   * The map manager for handling game maps.  There should only be one instance of this class.
   * @type {MapManager|null}
   */
  mapManager;

  /**
   * The calendar manager for handling game time.  There should only be one instance of this class.
   * @type {CalendarManager|null}
   */
  calendarManager;

  start () {
    // Do any one-time setup here, then call update()
    this.sceneManager.start()

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
  game.gameManager = new GameManager({ game })
  game.eventManager = new EventManager({ game })

  const managerConfig = {
    game,
    gameManager: game.gameManager,
    eventManager: game.eventManager
  }

  game.entityManager = new EntityManager({ ...managerConfig })
  game.imageManager = new ImageManager({ ...managerConfig })
  game.mapManager = new MapManager({ ...managerConfig, imageManager: game.imageManager })
  game.audioManager = new AudioManager({ ...managerConfig })
  game.fontManager = new FontManager({ ...managerConfig })
  game.inputManager = new InputManager({ ...managerConfig })
  game.calendarManager = new CalendarManager({ ...managerConfig })

  game.loadManager = new LoadManager({
    ...managerConfig,
    imageManager: game.imageManager,
    audioManager: game.audioManager,
    fontManager: game.fontManager
  })

  game.sceneManager = new SceneManager({
    game,
    managers: {
      gameManager: game.gameManager,
      loadManager: game.loadManager,
      eventManager: game.eventManager,
      imageManager: game.imageManager,
      audioManager: game.audioManager,
      fontManager: game.fontManager,
      inputManager: game.inputManager,
      calendarManager: game.calendarManager,
      entityManager: game.entityManager,
      mapManager: game.mapManager
    }
  })
}