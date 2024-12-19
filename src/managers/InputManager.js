import { Player1Keys, Player2Keys, ArrowKeys } from '../globals/Keys.js'
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

    this.DEBUG_LOG_CLICK_XY = true; // only used during dev - leave this set to false
    this.justDown = {}
    this.stillDown = {}
    this.justUp = {}
    this.player1KeyValues = null
    this.player2KeyValues = null
    this.ignore = false
    this.activeGamepad = null

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
    window.addEventListener("gamepadconnected", this.handleGamepadConnected.bind(this))
    window.addEventListener("gamepaddisconnected", this.handleGamepadConnected.bind(this))
  }

  handleGamepadConnected (event) {
    console.log("Gamepad connected:")
    console.log(event.gamepad)
    this.activeGamepad = event.gamepad
  }

  handleGamepadDisconnected (event) {
    console.log("Gamepad disconnected:")
    console.log(event.gamepad)
    this.activeGamepad = null
  }

  // because gamepads do not fire browser events, we have to "ask" every frame
  pollGamepad () {
    if (!navigator.getGamepads) return;
    this.activeGamepad = navigator.getGamepads()[0]; // need a new obj every frame
    if (!this.activeGamepad) return;
    const deadZone = 0.1 // avoid drift (we never get exactly zero)
    const left = this.activeGamepad.axes[0] < -deadZone
    const right = this.activeGamepad.axes[0] > deadZone
    const up = this.activeGamepad.axes[1] < -deadZone
    const down = this.activeGamepad.axes[1] > deadZone
    const action = // for now, allow using ANY of the four buttons
      this.activeGamepad.buttons[0].value // (A)
      || this.activeGamepad.buttons[1].value // (B)
      || this.activeGamepad.buttons[2].value // (X)
      || this.activeGamepad.buttons[3].value // (Y)
    // make the gamepad emulate arrow keys
    if (left && !this.stillDown[ArrowKeys.Left]) this.handleKeyDown({key:ArrowKeys.Left,preventDefault:()=>{}});
    if (!left && this.stillDown[ArrowKeys.Left]) this.handleKeyUp({key:ArrowKeys.Left,preventDefault:()=>{}});
    if (right && !this.stillDown[ArrowKeys.Right]) this.handleKeyDown({key:ArrowKeys.Right,preventDefault:()=>{}});
    if (!right && this.stillDown[ArrowKeys.Right]) this.handleKeyUp({key:ArrowKeys.Right,preventDefault:()=>{}});
    if (up && !this.stillDown[ArrowKeys.Up]) this.handleKeyDown({key:ArrowKeys.Up,preventDefault:()=>{}});
    if (!up && this.stillDown[ArrowKeys.Up]) this.handleKeyUp({key:ArrowKeys.Up,preventDefault:()=>{}});
    if (down && !this.stillDown[ArrowKeys.Down]) this.handleKeyDown({key:ArrowKeys.Down,preventDefault:()=>{}});
    if (!down && this.stillDown[ArrowKeys.Down]) this.handleKeyUp({key:ArrowKeys.Down,preventDefault:()=>{}});
    if (action && !this.stillDown[ArrowKeys.Action]) this.handleKeyDown({key:ArrowKeys.Action,preventDefault:()=>{}});
    if (!action && this.stillDown[ArrowKeys.Action]) this.handleKeyUp({key:ArrowKeys.Action,preventDefault:()=>{}});
    // console.log("gamepad state: "+(up?"⬆":"")+(down?"⬇":"")+(left?"⬅":"")+(right?"➡":"")+(action?"💥":""))
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
    this.pollGamepad()
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