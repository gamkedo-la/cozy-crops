import Scene from './Scene.js'
import Player from '../entities/Player.js'
import Keys from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'
import Cabbage from '../entities/crops/Cabbage.js'
// FIXME: why does this make the game render nothingness with NO ERRORS in the console?
import Butterfly from '../entities/wildlife/Butterfly.js'

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
    const cabbageSeedling = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364
    })

    cabbageSeedling.init()
    this.entityManager.addEntity(cabbageSeedling)

    deltaY += 16

    const cabbageYoungSprout = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cabbageYoungSprout.currentGrowthStage = 1
    cabbageYoungSprout.init()
    this.entityManager.addEntity(cabbageYoungSprout)

    deltaY += 16

    const cabbageSprout = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cabbageSprout.currentGrowthStage = 2
    cabbageSprout.init()
    this.entityManager.addEntity(cabbageSprout)

    deltaY += 16

    const cabbageYoungPlant = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cabbageYoungPlant.currentGrowthStage = 3
    cabbageYoungPlant.init()
    this.entityManager.addEntity(cabbageYoungPlant)

    deltaY += 16

    const cabbageMature = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cabbageMature.currentGrowthStage = 4
    cabbageMature.init()
    this.entityManager.addEntity(cabbageMature)

    deltaY += 16

    const cabbageHarvest = new Cabbage({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 460,
      y: 364 + deltaY
    })

    cabbageHarvest.currentGrowthStage = 5
    cabbageHarvest.init()
    this.entityManager.addEntity(cabbageHarvest)

    this.spawnButterflies(80)
  }

  spawnButterflies(howmany) {
    console.log("spawning "+howmany+" butterflies...");
    for (let i=0; i<howmany; i++) {
      let bug = new Butterfly({
        game: this.game,
        scene: this,
        imageManager: this.imageManager,
        x: Math.random() * 3200,
        y: Math.random() * 2400
      })
      bug.init()
      this.entityManager.addEntity(bug)
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
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Pause the game
  }

  if (CheatKeys) checkCheatKeys(scene)
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
