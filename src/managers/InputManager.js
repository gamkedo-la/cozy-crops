import { Player1Keys, Player2Keys } from '../globals/Keys.js'
import { Player1, Player2 } from '../globals/EntityTypes.js'

/**
 * @typedef {import('../Game.js').default} Game
 * @typedef {import('./EventManager.js').default} EventManager
 */

export default class InputManager {
  /**
   * Creates an instance of InputManager.
   * 
   * @param {Object} config - The configuration object.
   * @param {Game} config.game - An instance of the Game class.
   * @param {EventManager} config.eventManager - An instance of the EventManager class.
   */
  constructor (config) {
    Object.assign(this, config)

    this.justDown = {}
    this.stillDown = {}
    this.justUp = {}
    this.player1KeyValues = null
    this.player2KeyValues = null
    this.ignore = false

    this.mouse = {
      x: 0,
      y: 0,
      justDown: false,
      down: false,
      justUp: false,
      up: false
    }

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  setPlayerKeys () {
    this.player1KeyValues = Object.values(this.gameManager.getPlayerControls(Player1))
    this.player2KeyValues = Object.values(this.gameManager.getPlayerControls(Player2))
  }

  setPlayerControl (player, control, key) {
    this.gameManager.setPlayerControls(player, control, key)
    this.setPlayerKeys()
  }

  getPlayerControls (player) {
    if (player === Player1) {
      return this.gameManager.getPlayerControls(Player1)
    } else if (player === Player2) {
      return this.gameManager.getPlayerControls(Player2)
    }
  }

  ignoreInput (ignore) {
    this.ignore = ignore
  }

  update (deltaTime) {
    this.justDown = {}
    this.justUp = {}
    this.mouse.justDown = false
    this.mouse.justUp = false
  }

  handleKeyDown (event) {
    if (this.ignore) return

    event.preventDefault()

    if (!this.stillDown[event.key]) {
      this.justDown[event.key] = true
    }
    this.stillDown[event.key] = true
    this.justUp[event.key] = false
  }

  handleKeyUp (event) {
    if (this.ignore) return

    event.preventDefault()

    this.justUp[event.key] = true
    this.stillDown[event.key] = false
    this.justDown[event.key] = false
  }

  handleMouseMove (event) {
    const rect = this.game.canvas.getBoundingClientRect()
    this.mouse.x = event.clientX - rect.left
    this.mouse.y = event.clientY - rect.top
  }

  handleMouseDown (event) {
    this.mouse.justDown = true
    this.mouse.down = true
    this.mouse.justUp = false
    this.mouse.up = false

    const rect = this.game.canvas.getBoundingClientRect()
    this.mouse.x = event.clientX - rect.left
    this.mouse.y = event.clientY - rect.top
  }

  handleMouseUp (event) {
    this.mouse.justDown = false
    this.mouse.down = false
    this.mouse.justUp = true
    this.mouse.up = true
  }

  isKeyJustDown (key) {
    return this.justDown[key]
  }

  isKeyStillDown (key) {
    return this.stillDown[key]
  }

  isKeyJustUp (key) {
    return this.justUp[key]
  }

  getJustDownKeys (player) {
    if (player === Player1) {
      return Object.keys(this.justDown).filter(key => this.justDown[key] && this.player1KeyValues.includes(key))
    } else if (player === Player2) {
      return Object.keys(this.justDown).filter(key => this.justDown[key] && this.player2KeyValues.includes(key))
    }

    return Object.keys(this.justDown).filter(key => this.justDown[key])
  }

  getDownKeys (player) {
    if (player === Player1) {
      return Object.keys(this.stillDown).filter(key => this.stillDown[key] && this.player1KeyValues.includes(key))
    } else if (player === Player2) {
      return Object.keys(this.stillDown).filter(key => this.stillDown[key] && this.player2KeyValues.includes(key))
    }

    return Object.keys(this.stillDown).filter(key => this.stillDown[key])
  }

  getJustUpKeys (player) {
    if (player === Player1) {
      return Object.keys(this.justUp).filter(key => this.justUp[key] && this.player1KeyValues.includes(key))
    } else if (player === Player2) {
      return Object.keys(this.justUp).filter(key => this.justUp[key] && this.player2KeyValues.includes(key))
    }

    return Object.keys(this.justUp).filter(key => this.justUp[key])
  }

  getMousePosition () {
    return this.mouse
  }

  isMouseOver (element) {
    const rect = element.getBoundingClientRect()
    return this.mouse.x >= rect.left && this.mouse.x <= rect.right && this.mouse.y >= rect.top && this.mouse.y <= rect.bottom
  }
}