import Keys, { Player1Keys, Player2Keys } from '../globals/Keys.js'
import { Player1, Player2 } from '../globals/EntityTypes.js'

export default class InputManager {
  constructor (config) {
    Object.assign(this, config)

    this.justDown = {}
    this.stillDown = {}
    this.justUp = {}
    this.player1KeyValues = Object.values(Player1Keys)
    this.player2KeyValues = Object.values(Player2Keys)

    this.mouse = {
      x: 0,
      y: 0,
      clicked: false
    }

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  update (deltaTime) {
    this.justDown = {}
    this.justUp = {}
  }

  handleKeyDown (event) {
    event.preventDefault()

    if (!this.stillDown[event.key]) {
      this.justDown[event.key] = true
    }
    this.stillDown[event.key] = true
    this.justUp[event.key] = false
  }

  handleKeyUp (event) {
    event.preventDefault()

    this.justUp[event.key] = true
    this.stillDown[event.key] = false
    this.justDown[event.key] = false
  }

  handleMouseMove (event) {
    this.mouse.x = event.clientX
    this.mouse.y = event.clientY
  }

  handleMouseDown (event) {
    this.mouse.clicked = true
  }

  handleMouseUp (event) {
    this.mouse.clicked = false
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

  isMouseOver (element) {
    const rect = element.getBoundingClientRect()
    return this.mouse.x >= rect.left && this.mouse.x <= rect.right && this.mouse.y >= rect.top && this.mouse.y <= rect.bottom
  }
}