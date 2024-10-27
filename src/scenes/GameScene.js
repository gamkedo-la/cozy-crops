import Scene from './Scene.js'
import Player from '../entities/Player.js'
import Keys from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'
import Cabbage from '../entities/crops/Cabbage.js'
import Onion from '../entities/crops/Onion.js'
import Carrot from '../entities/crops/Carrot.js'
import Corn from '../entities/crops/Corn.js'
import Butterfly from '../entities/wildlife/Butterfly.js'
import Bunny from '../entities/wildlife/Bunny.js'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    
    this.camera = null
    this.steve = null
    this.steve2 = null

    this.collisionManager = null
  }

  addEntity (entity) {
    this.entityManager.addEntity(entity)
  }

  start () {
    const modifiedTiles = this.gameManager.getModifiedTiles()
    this.mapManager.start(modifiedTiles)
    this.inventoryManager.start()

    this.collisionManager = new CollisionManager({
      game: this.game,
      scene: this
    })

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

    this.spawnButterflies(128)
    this.spawnBunnies(128)
  }

  spawnButterflies(howmany) {
    console.log("spawning "+howmany+" butterflies...");
    for (let i=0; i<howmany; i++) {
      let bug = new Butterfly({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        x: Math.random() * 1600,
        y: Math.random() * 1200
      })
      bug.init()
      this.entityManager.addEntity(bug, true, true)
    }
  }

  // silent crashes with no error message and no console logs
  // this projects is impossible to debug
  spawnBunnies(howmany) {
    console.log("spawning "+howmany+" bunnies...")
    for (let i=0; i<howmany; i++) {
      const bunnyPos = {
        x: Math.random() * 1600,
        y: Math.random() * 1200
      }

      let tile = this.mapManager.getTileAtPixelPos(bunnyPos.x, bunnyPos.y)
      let tries = 0
      while (this.collisionManager.playerCanWalk(tile) === false) {
        tries++
        if (tries > 100) {
          console.log("couldn't find a place to spawn a bunny")
          break
        }

        bunnyPos.x = Math.random() * 1600
        bunnyPos.y = Math.random() * 1200
        tile = this.mapManager.getTileAtPixelPos(bunnyPos.x, bunnyPos.y)
      }
  
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

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    this.entityManager.update(deltaTime)

    this.calendarManager.update(deltaTime)
    this.mapManager.update(deltaTime)
    this.camera.update(deltaTime)
    this.draw()
  }

  draw () {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap()
    this.entityManager.draw()
  
    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  handleInventoryItemClick (item) {
    if (this.steve) {
      if (this.entityManager.isTool(item)) {
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
      case 'Grass1':
      case 'Grass2':
      case 'Grass3':
      case 'Grass4':
        return ['Till']
      case 'Door':
        return ['Open Door']
      case 'Sand':
        return ['Plant', 'Water', 'Till', 'Harvest']
      case 'WetSand':
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

  tillGround (x, y) {
    this.mapManager.updateTileAtPixelPos(x, y, 'Sand')
  }

  waterGround (x, y) {
    this.mapManager.updateTileAtPixelPos(x, y, 'WetSand')
  }

  cameraDidSleep () {
    console.log('Camera did sleep')
    this.steve.sleep()
    this.camera.wake(this)
  }

  cameraDidWake () {
    console.log('Camera did wake')
    this.steve.wake()
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
  }

  if (CheatKeys) checkCheatKeys(scene)
}

function sleep (scene) {
  scene.camera.sleep(scene)
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
