import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Player from '../entities/Player.js'
import Keys from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'
import Cabbage from '../entities/crops/Cabbage.js'

let day = 1
let season = 1
let year = 1
let seasonLength = 9
let seasonDisplay = 'Empty'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    
    this.drawList = []
    this.camera = null
    this.steve = null
    this.steve2 = null

    this.collisionManager = null
  }

  addEntity (entity) {
    insertEntity(this, entity)
  }

  start () {
    this.mapManager.start()
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
    // If there is a second player, add it to the camera config
    if (this.steve2) {
      cameraConfig.player2 = this.steve2
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
    insertEntity(this, cabbageSeedling)

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
    insertEntity(this, cabbageYoungSprout)

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
    insertEntity(this, cabbageSprout)

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
    insertEntity(this, cabbageYoungPlant)

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
    insertEntity(this, cabbageMature)

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
    insertEntity(this, cabbageHarvest)
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    for (const entity of this.drawList) {
      entity.update(deltaTime)
    }

    this.calendarManager.update(deltaTime)
    this.camera.update(deltaTime)
    this.draw()
  }

  draw () {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap()
    removeEntity(this, this.steve)
    insertEntity(this, this.steve)
    for (const entity of this.drawList) {
      entity.draw()
    }
  
    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk(newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x, newPosition.y)
    return this.collisionManager.playerCanWalk(tileIndex)
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Pause the game
  }

  if (CheatKeys) checkCheatKeys(scene)
}

function insertEntity (scene, entity) {
  let low = 0
  let high = scene.drawList.length

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (scene.drawList[mid].y + scene.drawList[mid].height < entity.y + entity.height) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  scene.drawList.splice(low, 0, entity)
}

function removeEntity (scene, entity) {
  const index = scene.drawList.indexOf(entity)
  if (index > -1) {
    scene.drawList.splice(index, 1)
  }
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
    // TODO: Get these colors from the player's saved data or from the player's selection
    skinColor: scene.gameManager.getPlayerColor(Player1, 'Body'),
    hairColor: scene.gameManager.getPlayerColor(Player1, 'Hair'),
    shirtColor: scene.gameManager.getPlayerColor(Player1, 'Shirt'),
    pantsColor: scene.gameManager.getPlayerColor(Player1, 'Pants'),
    accessoriesColor: Colors.Shirt[0], // accessories not implemented yet
    controls: scene.managers.gameManager.getPlayerControls(Player1)
  })

  scene.steve.init()

  // scene.addEntity(scene.steve)
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
