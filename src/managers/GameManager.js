import LocalStorageKeys from '../globals/LocalStorageKeys.js'
import EntityTypes from '../globals/EntityTypes.js'
import { ArrowKeys, Player1Keys, Player2Keys, WASDKeys } from '../globals/Keys.js'

// GameManager is responsible for keeping track of the game state and saving it to local storage.
// It is also responsible for loading the game state from local storage when the game is started.
// Game State includes:
// Player position
// Player money
// Player inventory
// Player controls (Arrow keys or WASD)
// Status of crops in the field
// Status of the store (what is available for purchase)
// Status of the player's house (upgrades, etc.)
// Season, Week, and Day
export default class GameManager {
  constructor (config) {
    Object.assign(this, config)
    this.state = {}
    this.saveSlot = 1
  }

  loadGame (saveSlot) {
    // Attempt to load the game state from local storage
    this.saveSlot = saveSlot
    const gameState = localStorage.getItem(`${LocalStorageKeys.SaveSlot}${this.saveSlot}`)
    if (gameState) {
      // If the game state exists, load it
      this.state = JSON.parse(gameState)
    } else {
      // If the game state does not exist, initialize a new game
      this.initializeNewGame()
    }
  }

  saveGame () {
    // Save the game state to local storage
    localStorage.setItem(`${LocalStorageKeys.SaveSlot}${this.saveSlot}`, JSON.stringify(this.state))
  }

  initializeNewGame (saveSlot) {
    // If the game state does not exist, initialize a new game
    // Initialize game state
    this.saveSlot = saveSlot
    this.state = {
      Player1Controls: ArrowKeys,
      Player2Controls: WASDKeys
    }
    this.saveGame()
  }

  getPlayerControls (player) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1Controls
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2Controls
    }
  }

  setPlayerControls (player, control, key) {
    if (player === EntityTypes.Player1) {
      this.state.Player1Controls[control] = key
      localStorage.setItem(LocalStorageKeys.Player1Controls, JSON.stringify(this.state.Player1Controls))
    } else if (player === EntityTypes.Player2) {
      this.state.Player2Controls[control] = key
      localStorage.setItem(LocalStorageKeys.Player2Controls, JSON.stringify(this.state.Player2Controls))
    }
  }
}