import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Player from '../entities/Player.js'
import Keys from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import EntityTypes, { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'
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
import { Door } from '../globals/TilesPlayerHome.js'
import { CarpenterDoor } from '../globals/TilesCarpenter.js'
import { BlacksmithDoor } from '../globals/TilesBlacksmith.js'
import { MuseumDoor } from '../globals/TilesMuseum.js'
import { StoreDoor } from '../globals/TilesStore.js'
import { Grass1, Grass2, Grass3, Grass4, Sand, WetSand } from '../globals/TilesWorld.js'
import { TileNames } from '../globals/Tiles.js'
import Fisherman from '../entities/npcs/Fisherman.js'
import Grandma from '../entities/npcs/Grandma.js'
import Lumberjack from '../entities/npcs/Lumberjack.js'
import Tiffany from '../entities/npcs/Tiffany.js'
import Weather from '../entities/effects/Weather.js'
import Particles from '../entities/effects/Particles.js'
import { BackgroundBirds } from '../globals/Sounds.js'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    
    this.camera = null

    this.steve = null
    // this.steve2 = null

    this.isSleeping = false

    this.fisherman = null
    this.grandma = null
    this.lumberjack = null
    this.tiffany = null

    this.weather = null

    this.collisionManager = null
  }

  addEntity (entity) {
    this.entityManager.addEntity(entity)
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    const modifiedTiles = this.gameManager.getModifiedTiles()
    this.mapManager.start(modifiedTiles)
    this.inventoryManager.start()

    this.inputManager.setPlayerKeys()

    addPlayers(this)
    const cameraConfig = {
      game: this.game,
      imageManager: this.imageManager,
      player1: this.steve
    }
    this.entityManager.addEntity(this.steve, true)
    // If there is a second player, add it to the camera config
    // if (this.steve2) {
    //   cameraConfig.player2 = this.steve2
    //   this.entityManager.addEntity(this.steve2, true)
    // }
    this.camera = new Camera(cameraConfig)
    this.imageManager.setCamera(this.camera)
    const date = this.gameManager.getDate()
    this.calendarManager.setStartDate(date.year, date.season, date.week, date.day)

    this.collisionManager = new CollisionManager({
      game: this.game,
      scene: this,
      player: this.steve
    })
    this.mapManager.collisionManager = this.collisionManager

    this.spawnNPCs()


    this.particles = new Particles({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        gameManager: this.gameManager,
        x: 0,
        y: 0
      })
    
    this.spawnButterflies(64)
    this.spawnBunnies(32)
    this.spawnForageableItems(32)

    this.weather = new Weather({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        audioManager: this.audioManager,
        gameManager: this.gameManager,
        calendarManager: this.calendarManager,
        x: 0,
        y: 0
    })
    this.weather.init()

    // idea: subtle background birds add to a happy feeling?
    // todo: only play in summer? move inside weather system perhaps?
    this.audioManager.startMusic(BackgroundBirds) // play on loop
    this.audioManager.setMusicVolume(BackgroundBirds,0.5) // make quieter
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
    let bunnyPos;
    for (let i = 0; i < howmany; i++) {
      bunnyPos = this.mapManager.getRandomTilePos(true) // must be walkable
      let bun = new Bunny({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        particles: this.particles,
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
      this.entityManager.addEntity(item, false)
    }
  }

  spawnNPCs() {
    const fishermanStartPos = this.mapManager.getNPCStart(EntityTypes.Fisherman)
    const fishermanData = this.gameManager.getNPCData(EntityTypes.Fisherman)
    this.fisherman = new Fisherman({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: fishermanStartPos.x,
      y: fishermanStartPos.y,
      ...fishermanData
    })
    this.fisherman.init()
    this.entityManager.addEntity(this.fisherman, true)
    this.collisionManager.addEntity(this.fisherman)

    const grandmaStartPos = this.mapManager.getNPCStart(EntityTypes.Grandma)
    const grandmaData = this.gameManager.getNPCData(EntityTypes.Grandma)
    this.grandma = new Grandma({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: grandmaStartPos.x,
      y: grandmaStartPos.y,
      ...grandmaData
    })
    this.grandma.init()
    this.entityManager.addEntity(this.grandma, true)
    this.collisionManager.addEntity(this.grandma)

    const lumberjackStartPos = this.mapManager.getNPCStart(EntityTypes.Lumberjack)
    const lumberjackData = this.gameManager.getNPCData(EntityTypes.Lumberjack)
    this.lumberjack = new Lumberjack({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: lumberjackStartPos.x,
      y: lumberjackStartPos.y,
      ...lumberjackData
    })
    this.lumberjack.init()
    this.entityManager.addEntity(this.lumberjack, true)
    this.collisionManager.addEntity(this.lumberjack)

    const tiffanyStartPos = this.mapManager.getNPCStart(EntityTypes.Tiffany)
    const tiffanyData = this.gameManager.getNPCData(EntityTypes.Tiffany)
    this.tiffany = new Tiffany({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: tiffanyStartPos.x,
      y: tiffanyStartPos.y,
      ...tiffanyData
    })
    this.tiffany.init()
    this.entityManager.addEntity(this.tiffany, true)
    this.collisionManager.addEntity(this.tiffany)
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.entityManager.update(deltaTime)
    this.collisionManager.update(deltaTime)
    this.weather.update(deltaTime)
    
    if (this.playerIsWalking) {
      this.particles.dust(this.steve.collisionPoint.x, this.steve.collisionPoint.y)
    }
    this.playerIsWalkingNow(false)
    const waterfalls = this.mapManager.getWaterfallTilesXY()
    for (const waterfall of waterfalls) {
      this.particles.splash(waterfall.x, waterfall.y)
    }
    
    this.particles.update(deltaTime)

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
    this.particles.draw()
    // Do Not draw after the Image Manager Renders
    this.imageManager.render()

    // Weather is an exception because it is drawn differently
    this.weather.draw()
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
    const result = new Set()
    const tileTopLeft = this.mapManager.getTileTopLeftAtPixelPos(x, y)
    const entities = this.entityManager.getEntitiesAt(tileTopLeft.x, tileTopLeft.y)
    if (entities.some(entity => this.entityManager.isHarvestable(entity))) result.add('Harvest')
    if (entities.some(entity => this.entityManager.isClearable(entity))) result.add('Clear')

    const tileType = this.mapManager.getTileTypeAtPixelPos(x, y)
    switch (tileType) {
      case TileNames[Grass1]:
      case TileNames[Grass2]:
      case TileNames[Grass3]:
      case TileNames[Grass4]:
        result.add('Till')
        break
      case TileNames[Door]:
      case TileNames[MuseumDoor]:
      case TileNames[StoreDoor]:
      case TileNames[CarpenterDoor]:
      case TileNames[BlacksmithDoor]:
        result.add('Open Door')
        break
      case TileNames[Sand]:
        result.add('Plant')
        result.add('Water')
        break
      case TileNames[WetSand]:
        result.add('Plant')
        result.add('Water')
        break
      case 'Water':
        result.add('Fish')
        break
      case 'RockyGround':
        break
      case 'Chest':
        result.add('Open')
        break
      default:
        break
    }

    return Array.from(result)
  }

  openDoor (x, y) {
    const openedDoor = this.mapManager.getTileAtPixelPos(x, y)
    switch (openedDoor) {
      case 12:
        console.log('Open door to the Player\'s House')
        this.game.changeScene(Scenes.PlayerHome, { player: this.steve })
        break
      case 103:
        this.game.changeScene(Scenes.Museum, { player: this.steve })
        break
      case 121:
        console.log('Open door to the Store')
        this.game.changeScene(Scenes.Store, { player: this.steve })
        break
      case 689:
          this.game.changeScene(Scenes.Carpenter, { player: this.steve })
          break
      case 690:
         this.game.changeScene(Scenes.Blacksmith, { player: this.steve })
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

  harvestCrop (x, y) {
    const tileTopLeft = this.mapManager.getTileTopLeftAtPixelPos(x, y)
    const entities = this.entityManager.getEntitiesAt(tileTopLeft.x, tileTopLeft.y)
    for (const entity of entities) {
      if (this.entityManager.isHarvestable(entity)) {
        this.entityManager.removeEntity(entity)
        this.inventoryManager.addItemToInventory(entity.type, 1)
      }
    }
  }

  reachedEndOfDay () {
    sleep(this)
    this.newDayActions()
  }

  newDayActions () {
    this.cropManager.advanceDay()
    this.mapManager.unWaterAllTiles()
    setNewWeather(this)
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

function setNewWeather (scene) {
  switch (scene.calendarManager.weather) {
    case 'Rain':
      scene.weather.startRaining()
      scene.mapManager.waterAllSand()
      break
    case 'Snow':
      scene.weather.startSnowing()
      break
    case 'Fog':
      scene.weather.getFoggy()
      break
    case 'Cool':
      scene.weather.getCool()
      break
    default:
      scene.weather.stopWeather()
      break
  }
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
