import LocalStorageKeys from '../globals/LocalStorageKeys.js'
import EntityTypes from '../globals/EntityTypes.js'
import PlayerImageData from '../globals/PlayerImageData.js'
import { ArrowKeys, WASDKeys } from '../globals/Keys.js'
import { WetSand } from '../globals/Tiles.js'

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
    const slots = this.getSaveSlots()
    this.saveSlot = slots ? slots[0] : null
  }

  getSaveSlots () {
    // Get the save slots from local storage
    const slots = localStorage.getItem(LocalStorageKeys.SaveSlots)
    if (slots) {
      return JSON.parse(slots)
    } else {
      return null
    }
  }

  saveSaveSlot (slot) {
    let currentSlots = this.getSaveSlots()
    if (!currentSlots) currentSlots = []
    const existingSlot = currentSlots.find(s => s === slot)
    if (!existingSlot) {
      currentSlots.push(slot)
      localStorage.setItem(LocalStorageKeys.SaveSlots, JSON.stringify(currentSlots))
    }
  }

  clearSaveSlot (slot) {
    let currentSlots = this.getSaveSlots()
    if (!currentSlots) return
    const updatedSlots = currentSlots.filter(s => s !== slot)
    localStorage.setItem(LocalStorageKeys.SaveSlots, JSON.stringify(updatedSlots))
    localStorage.removeItem(`${LocalStorageKeys.SaveSlot}${slot}`)
  }

  loadGame (saveSlot) {
    if (!saveSlot) return

    // Attempt to load the game state from local storage
    this.saveSlot = saveSlot
    const gameState = localStorage.getItem(`${LocalStorageKeys.SaveSlot}${this.saveSlot}`)
    if (gameState) {
      // If the game state exists, load it
      this.state = JSON.parse(gameState)
    } else {
      // If the game state does not exist, initialize a new game
      initializeNewGame(this, saveSlot)
    }
  }

  saveGame () {
    // Save the game state to local storage
    localStorage.setItem(`${LocalStorageKeys.SaveSlot}${this.saveSlot}`, JSON.stringify(this.state))
  }

  getPlayerColors (player) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1.Colors
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2.Colors
    }
  }

  getPlayerColor (player, part) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1.Colors[part]
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2.Colors[part]
    }
  }

  setPlayerColor (player, part, color) {
    if (player === EntityTypes.Player1) {
      this.state.Player1.Colors[part] = color
      localStorage.setItem(LocalStorageKeys.Player1.Colors[part], color)
    } else if (player === EntityTypes.Player2) {
      this.state.Player2.Colors[part] = color
      localStorage.setItem(LocalStorageKeys.Player2.Colors[part], color)
    }
  }

  getPlayerStyles (player) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1.Styles
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2.Styles
    }
  }

  setPlayerStyles (player, part, style) {
    if (player === EntityTypes.Player1) {
      this.state.Player1.Styles[part] = style
      localStorage.setItem(LocalStorageKeys.Player1.Styles[part], style)
    } else if (player === EntityTypes.Player2) {
      this.state.Player2.Styles[part] = style
      localStorage.setItem(LocalStorageKeys.Player2.Styles[part], style)
    }
  }

  getPlayerControls (player) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1.Controls
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2.Controls
    }
  }

  setPlayerControls (player, control, key) {
    if (player === EntityTypes.Player1) {
      this.state.Player1.Controls[control] = key
      localStorage.setItem(LocalStorageKeys.Player1.Controls, JSON.stringify(this.state.Player1.Controls))
    } else if (player === EntityTypes.Player2) {
      this.state.Player2.Controls[control] = key
      localStorage.setItem(LocalStorageKeys.Player2.Controls, JSON.stringify(this.state.Player2.Controls))
    }
  }

  setPlayerStamina (player, stamina) {
    if (player === EntityTypes.Player1) {
      this.state.Player1.Stamina = stamina
      localStorage.setItem(LocalStorageKeys.Player1.Stamina, stamina)
    } else if (player === EntityTypes.Player2) {
      this.state.Player2.Stamina = stamina
      localStorage.setItem(LocalStorageKeys.Player2.Stamina, stamina)
    }
  }

  getPlayerStamina (player) {
    if (player === EntityTypes.Player1) {
      return this.state.Player1.Stamina
    } else if (player === EntityTypes.Player2) {
      return this.state.Player2.Stamina
    }
  }

  setMoney (money) {
    this.state.Money = money
      localStorage.setItem(LocalStorageKeys.Money, money)
  }

  getMoney () {
    return this.state.Money
  }

  setInventory (inventory) {
    this.state.Inventory = inventory
    localStorage.setItem(LocalStorageKeys.Inventory, JSON.stringify(inventory))
  }

  addToInventory (type, quantity) {
    const existingItem = this.state.Inventory.find(i => i.type === type)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.state.Inventory.push({ type, quantity })
    }
    this.saveGame()
  }

  removeFromInventory (type, quantity) {
    const existingItem = this.state.Inventory.find(i => i.type === type)
    if (existingItem) {
      existingItem.quantity -= quantity
      if (existingItem.quantity <= 0) {
        this.state.Inventory = this.state.Inventory.filter(i => i.type !== type)
      }
    }
    this.saveGame()
  }

  getInventory () {
    return this.state.Inventory
  }

  getDate () {
    return this.state.Calendar
  }

  setDate (date) {
    this.state.Calendar = date
    this.saveGame()
  }

  newDaySave (date) {
    this.state.Calendar = date
    this.state.Player1.Stamina = 100 // TODO: If player didn't make it back to bed, they don't get 100% stamina back
    this.saveGame()
  }

  getModifiedTiles () {
    return this.state.Map.ModifiedTiles || []
  }
  
  setModifiedTile (x, y, tileIndex, replacement) {
    const existingTile = this.state.Map.ModifiedTiles.find(t => t.x === x && t.y === y)
    if (existingTile) {
      existingTile.tileIndex = tileIndex
      existingTile.replacement = replacement
    } else {
      this.state.Map.ModifiedTiles.push({ x, y, tileIndex, replacement })
    }
    this.saveGame()
  }

  updateTimeForModifiedTile (x, y, tileIndex, time) {
    const existingTile = this.state.Map.ModifiedTiles.find(t => t.x === x && t.y === y)
    if (existingTile) {
      existingTile.replacement.time = time
    }
  }

  getWateredTiles () {
    return this.state.Map.ModifiedTiles.filter(tile => `${tile.tileIndex}` === `${WetSand}`)
  }

  getAchievements () {
    return this.state.Map.Achievements
  }

  setAchievements (achievements) {
    this.state.Map.Achievements = achievements
    this.saveGame()
  }
}

function initializeNewGame (manager, saveSlot) {
  // If the game state does not exist, initialize a new game
  // Initialize game state
  manager.saveSlot = saveSlot
  manager.state = {
    Player1: {
      Controls: ArrowKeys,
      Colors: {
        Body: PlayerImageData.Body.baseColor,
        Hair: PlayerImageData.Hair.baseColor,
        Shirt: PlayerImageData.Shirt.baseColor,
        Pants: PlayerImageData.Pants.baseColor
      },
      Styles: {
        Hair: 'Short',
        Shirt: 'Tee',
        Pants: 'Jeans'
      },
      Location: {
        X: 0,
        Y: 0
      },
      Stamina: 100
    },
    Player2: {
      Controls: WASDKeys,
      Colors: {
        Body: PlayerImageData.Body.baseColor,
        Hair: PlayerImageData.Hair.baseColor,
        Shirt: PlayerImageData.Shirt.baseColor,
        Pants: PlayerImageData.Pants.baseColor
      },
      Styles: {
        Hair: 'Short',
        Shirt: 'Tee',
        Pants: 'Jeans'
      },
      Location: {
        X: 0,
        Y: 0
      }
    },
    Calendar: {
      Year: 1,
      Season: 1,
      Week: 1,
      Day: 1
    },
    Inventory: [
      { type: EntityTypes.ShovelWooden, quantity: 1 },
      { type: EntityTypes.WateringCanWooden, quantity: 1 },
      { type: EntityTypes.HoeWooden, quantity: 1 },
      { type: EntityTypes.LettuceSeed, quantity: 1 },
      { type: EntityTypes.Sunflower, quantity: 1 },
    ],
    Map: {
      Achievements: [
        { name: 'Master Fisher', incompleteDescription: 'Catch 30 fish to earn this Plaque', completeDescription: 'Congratulations!\nYou caught 30 fish', type: EntityTypes.PlaqueFishing, requiredCount: 30, currentCount: 0, complete: false },
        { name: 'Centenial Crop', incompleteDescription: 'Harvest 100 crops to earn this Plaque', completeDescription: 'Congratulations!\nYou harvested 100 crops', type: EntityTypes.PlaqueFarming, requiredCount: 100, currentCount: 0, complete: false },
        { name: 'Master Gatherer', incompleteDescription: 'Forage for 50 items from the\nworld to earn this Plaque', completeDescription: 'Congratulations!\nYou found 50 items', type: EntityTypes.PlaqueForaging, requiredCount: 50, currentCount: 0, complete: false },
        { name: 'Antique Collector', incompleteDescription: 'Collect 10 pieces of furniture\nto earn this Plaque', completeDescription: 'Congratulations!\nYou collected 10 pieces of furniture', type: EntityTypes.PlaqueFurniture, requiredCount: 10, currentCount: 0, complete: false },
        { name: 'Master Salesman', incompleteDescription: 'Sell 1000 coins worth of\ncrops to earn this Plaque', completeDescription: 'Congratulations!\nYou sold 1000 coins\nworth of crops', type: EntityTypes.PlaqueSelling, requiredCount: 1000, currentCount: 0, complete: false },
        { name: 'Fish Collector', incompleteDescription: 'Catch One of each type of\nfish to earn this Painting', completeDescription: 'Congratulations!\nYou caught one of\neach type of fish', type: EntityTypes.PortraitMona, requiredCount: 9, collected: new Set(), complete: false },
        { name: 'Diversity Expert', incompleteDescription: 'Plant one of each type of\ncrop to earn this Painting', completeDescription: 'Congratulations!\nYou planted one of each type of crop', type: EntityTypes.PortraitPearl, requiredCount: 21, collected: new Set(), complete: false },
        { name: 'Gatherer Extrodinaire', incompleteDescription: 'Forage for one of each type\nof item to earn this Painting', completeDescription: 'Congratulations!\nYou found one of\neach type of item', type: EntityTypes.PortraitRGB, requiredCount: 6, collected: new Set(), complete: false },
        { name: 'Furniture Aficionado', incompleteDescription: 'Collect one of each type of\nfurniture to earn this Painting', completeDescription: 'Congratulations!\nYou collected one of\neach type of furniture', type: EntityTypes.PortraitStarry, requiredCount: 10, collected: new Set(), complete: false },
        { name: 'Good Samaritan', incompleteDescription: 'Complete every town quest', completeDescription: 'Congratulations!\nYou completed every town quest', type: EntityTypes.PortraitWave, requiredCount: 4, currentCount: 0, complete: false },
        { name: 'Favored Grandchild', incompleteDescription: 'Complete Grandma Mea\'s quest', completeDescription: 'Well done!\nYou helped Grandma Mea', type: EntityTypes.StatueBust, complete: false },
        { name: 'Jo Jo\'s Friend', incompleteDescription: 'Complete Jo Jo\'s quest', completeDescription: 'Well done!\nYou helped Jo Jo', type: EntityTypes.StatueFossil, complete: false },
        { name: 'Bob\'s Paul Bunyan', incompleteDescription: 'Complete Bob\'s quest', completeDescription: 'Well done!\nYou helped Bob', type: EntityTypes.StatueMoai, complete: false },
        { name: 'Tiffany\'s Souper Friend', incompleteDescription: 'Complete Tiffany\'s quest', completeDescription: 'Well done!\nYou helped Tiffany', type: EntityTypes.StatuePharaoh, complete: false }
      ],
      Crops: [
        // { x: 0, y: 0, type: EntityTypes.CropCarrot, growth: 0 }
      ],
      ModifiedTiles: [
        // { x: 0, y: 0, tileIndex: 0 }
      ]
    },
    Money: 100
  }

  manager.saveGame()
}