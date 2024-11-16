import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Player from '../entities/Player.js'
import Keys, { S } from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import EntityTypes, { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Lettuce from '../entities/crops/Lettuce.js'
import Onion from '../entities/crops/Onion.js'
import Butterfly from '../entities/wildlife/Butterfly.js'
import Bunny from '../entities/wildlife/Bunny.js'
import ForageableData from '../globals/ForageableData.js'
import Daffodil from '../entities/forageables/Daffodil.js'
import Sunflower from '../entities/forageables/Sunflower.js'
import Truffel from '../entities/forageables/Truffel.js'
import Tulip from '../entities/forageables/Tulip.js'
import WildGarlic from '../entities/forageables/WildGarlic.js'
import WildRose from '../entities/forageables/WildRose.js'
import { TileHeight } from '../globals/Constants.js'
import { Door, Grass1, Grass2, Grass3, Grass4, MuseumDoor, Sand, TileNames, WetSand } from '../globals/Tiles.js'

// FIXME: I keep getting compiler warnings about CaSe differences
// (weather.js vs Weather.js but I cannot figure out why)
// I double-checked everywhere and *only* the capitalized version exists in code and on disk
import Weather from '../entities/effects/Weather.js'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    
    this.camera = null
    this.steve = null
    this.steve2 = null
    this.isSleeping = false

    this.collisionManager = null
  }

  addEntity (entity) {
    this.entityManager.addEntity(entity)
  }

  init () {
    const modifiedTiles = this.gameManager.getModifiedTiles()
    this.mapManager.start(modifiedTiles)
    this.inventoryManager.start()

    this.collisionManager = new CollisionManager({
      game: this.game,
      scene: this
    })
    this.mapManager.collisionManager = this.collisionManager

    this.inputManager.setPlayerKeys()

    addPlayers(this)
    const cameraConfig = {
      game: this.game,
      imageManager: this.imageManager,
      player1: this.steve
    }
    this.entityManager.addEntity(this.steve, true)
    // If there is a second player, add it to the camera config
    if (this.steve2) {
      cameraConfig.player2 = this.steve2
      this.entityManager.addEntity(this.steve2, true)
    }
    this.camera = new Camera(cameraConfig)
    this.imageManager.setCamera(this.camera)
    const date = this.gameManager.getDate()
    this.calendarManager.setStartDate(date.year, date.season, date.week, date.day)

    // TODO: Remove this once the systems are fully implemented
    let deltaY = 0
    const cornSeedling = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364
    })

    cornSeedling.init()
    this.entityManager.addEntity(cornSeedling)

    deltaY += 16

    const cornYoungSprout = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cornYoungSprout.currentGrowthStage = 1
    cornYoungSprout.init()
    this.entityManager.addEntity(cornYoungSprout)

    deltaY += 16

    const cornSprout = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cornSprout.currentGrowthStage = 2
    cornSprout.init()
    this.entityManager.addEntity(cornSprout)

    deltaY += 16

    const cornYoungPlant = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cornYoungPlant.currentGrowthStage = 3
    cornYoungPlant.init()
    this.entityManager.addEntity(cornYoungPlant)

    deltaY += 16

    const cornMature = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cornMature.currentGrowthStage = 4
    cornMature.init()
    this.entityManager.addEntity(cornMature)

    deltaY += 16

    const cornHarvest = new Corn({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cornHarvest.currentGrowthStage = 5
    cornHarvest.init()
    this.entityManager.addEntity(cornHarvest)

    this.spawnButterflies(64)
    this.spawnBunnies(32)
    this.spawnForageableItems(32)

    // there is only one weather entity, with various
    // functions to change the weather upon request
    this.weather = new Weather({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        gameManager: this.gameManager,
        calendarManager: this.calendarManager,
        x: 0,
        y: 0
    })
  }

  spawnButterflies(howmany) {
    for (let i = 0; i < howmany; i++) {
      const butterflyPos = this.mapManager.getRandomTilePos(false)

      let bug = new Butterfly({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        x: butterflyPos.x,
        y: butterflyPos.y
      })

      bug.init()
      this.entityManager.addEntity(bug, true, true)
    }
  }

  spawnBunnies(howmany) {
    for (let i = 0; i < howmany; i++) {
      const bunnyPos = this.mapManager.getRandomTilePos()

      let bun = new Bunny({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        x: bunnyPos.x,
        y: bunnyPos.y
      })

      bun.init()
      this.entityManager.addEntity(bun, true)
    }
  }

  spawnForageableItems(howmany) {
    // Implement once ForageableItems are created
    for (let i = 0; i < howmany; i++) {
      const itemPos = this.mapManager.getRandomTilePos()
      const items = Object.keys(ForageableData)
      const itemType = items[Math.floor(Math.random() * items.length)]

      let item = null
      const config = {
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        x: itemPos.x,
        y: itemPos.y + TileHeight / 2
      }
      switch (itemType) {
        case EntityTypes.Daffodil:
          item = new Daffodil(config)
          break
        case EntityTypes.Sunflower:
          item = new Sunflower(config)
          break
        case EntityTypes.Truffel:
          item = new Truffel(config)
          break
        case EntityTypes.Tulip:
          item = new Tulip(config)
          break
        case EntityTypes.WildGarlic:
          item = new WildGarlic(config)
          break
        case EntityTypes.WildRose:
          item = new WildRose(config)
          break
      }

      item.init()
      this.entityManager.addEntity(item, true)
    }
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.entityManager.update(deltaTime)
    this.weather.update(deltaTime)

    if (!this.isSleeping) {
      this.calendarManager.update(deltaTime)
      this.mapManager.update(deltaTime)
    }

    this.camera.update(deltaTime)
    this.draw()
  }

  draw () {
    super.draw() // Call the draw method of the parent class
    this.mapManager.drawMap()
    this.entityManager.draw()
    this.imageManager.render()
    this.weather.draw(this.camera)
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  handleInventoryItemClick (item) {
    if (this.steve) {
      if (this.entityManager.isTool(item) || this.entityManager.isSeed(item)) {
        this.steve.setActiveTool(item)
      }
    }
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x, newPosition.y)
    return this.collisionManager.playerCanWalk(tileIndex)
  }

  getAvailableMapActions (x, y) {
    const tileType = this.mapManager.getTileTypeAtPixelPos(x, y)
    switch (tileType) {
      case TileNames[Grass1]:
      case TileNames[Grass2]:
      case TileNames[Grass3]:
      case TileNames[Grass4]:
        return ['Till']
      case TileNames[Door]:
      case TileNames[MuseumDoor]:
        return ['Open Door']
      case TileNames[Sand]:
        return ['Plant', 'Water', 'Till', 'Harvest']
      case TileNames[WetSand]:
        return ['Plant', 'Water', 'Harvest']
      case 'Water':
        return ['Fish']
      case 'RockyGround':
        return []
      case 'Chest':
        return ['Open']
      case 'Bed':
        return ['Sleep']
      default:
        return []
    }
  }

  openDoor (x, y) {
    const openedDoor = this.mapManager.getTileAtPixelPos(x, y)
    switch (openedDoor) {
      case 12:
        console.log('Open door to the Player\'s House')
        break
      case 103:
        this.game.changeScene(Scenes.Museum, { player: this.steve })
        break
    }
  }

  tillGround (x, y) {
    this.mapManager.updateTileAtPixelPos(x, y, 'Sand')
  }

  plantSeed (seedType, x, y) {
    // Find the center of the tile identified by x, y
    const tileCenter = this.mapManager.getTileTopLeftAtPixelPos(x, y)
    this.cropManager.plantCrop(seedType, tileCenter.x, tileCenter.y)
  }

  waterGround (x, y) {
    this.mapManager.updateTileAtPixelPos(x, y, 'WetSand')
    this.cropManager.waterAt(x, y)
  }

  reachedEndOfDay () {
    sleep(this)
    this.newDayActions()
  }

  newDayActions () {
    this.cropManager.advanceDay()
    this.mapManager.unWaterAllTiles()
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Pause the game
  }

  const justDownKeys = scene.inputManager.getJustDownKeys()
  if (justDownKeys.includes(Keys.N)) {
    sleep(scene)
    scene.calendarManager.advanceDay()
    scene.newDayActions()
  }

  if (CheatKeys) checkCheatKeys(scene)
}

function sleep (scene) {
  scene.isSleeping = true
  scene.camera.sleep(() => {
    scene.steve.sleep()
    scene.camera.wake(() => {
      scene.isSleeping = false
      scene.steve.wake()
    })
  })
}

function addPlayers (scene) {
  const player1Start =  scene.mapManager.getPlayerStart(Player1)
  scene.steve = new Player({
    type: Player1,
    game: scene.game,
    scene: scene,
    imageManager: scene.imageManager,
    x: player1Start.x,
    y: player1Start.y,
    skinColor: scene.gameManager.getPlayerColor(Player1, 'Body'),
    hairColor: scene.gameManager.getPlayerColor(Player1, 'Hair'),
    shirtColor: scene.gameManager.getPlayerColor(Player1, 'Shirt'),
    pantsColor: scene.gameManager.getPlayerColor(Player1, 'Pants'),
    accessoriesColor: Colors.Shirt[0], // accessories not implemented yet
    controls: scene.managers.gameManager.getPlayerControls(Player1)
  })

  scene.steve.init()
}

function checkCheatKeys (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  checkCalendarCheatKeys(scene, justDownKeys)

  checkSceneCheatKeys(scene, justDownKeys)
}

function checkCalendarCheatKeys (scene, justDownKeys) {
  if (justDownKeys.includes(Keys.I)) {
    scene.calendarManager.advanceDay()
  }
  if (justDownKeys.includes(Keys.O)) {
    scene.calendarManager.advanceSeason()
  }
  if (justDownKeys.includes(Keys.P)) {
    scene.calendarManager.advanceYear()
  }
}

function checkSceneCheatKeys (scene, justDownKeys) {
  if (justDownKeys.includes(Keys.M)) {
    scene.game.changeScene(Scenes.Museum, { player: scene.steve })
  }
}
