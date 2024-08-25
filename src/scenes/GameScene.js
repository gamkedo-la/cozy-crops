import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Player from '../entities/Player.js'
import Keys from '../globals/Keys.js'
import Camera from '../components/Camera.js'
import { Player1 } from '../globals/EntityTypes.js'
import CollisionManager from '../managers/CollisionManager.js'
import Colors from '../globals/Colors.js'
import { CheatKeys } from '../globals/Debug.js'

let day = 1
let season = 1
let year = 1
let seasonLength = 9
let seasonDisplay = 'Empty'

export default class GameScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.Game
    
    this.drawList = []
    this.camera = null
    this.steve = null
    this.steve2 = null

    this.collisionManager = null
  }

  addEntity (entity) {
    insertEntity(this, entity)
  }

  async start () {
    this.mapManager.start()
    this.collisionManager = new CollisionManager({
      game: this.game,
      scene: this
    })

    await addPlayers(this)
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
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    manageInput(this)
    for (const entity of this.drawList) {
      entity.update(deltaTime)
    }

    this.camera.update(deltaTime)
    draw(this)
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

function draw (scene) {
  scene.mapManager.drawMap()
  for (const entity of scene.drawList) {
    entity.draw()
  }

  scene.imageManager.render()
}

function insertEntity (scene, entity) {
  let low = 0
  let high = scene.drawList.length

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (scene.drawList[mid].y < entity.y) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  scene.drawList.splice(low, 0, entity)
}

async function addPlayers (scene) {
  const player1Start =  scene.mapManager.getPlayerStart(Player1)
  scene.steve = new Player({
    type: Player1,
    game: scene.game,
    scene: scene,
    imageManager: scene.imageManager,
    x: player1Start.x,
    y: player1Start.y,
    // TODO: Get these colors from the player's saved data or from the player's selection
    skinColor: Colors.Skin[0],
    shirtColor: Colors.Shirt[0],
    pantsColor: Colors.Pants[0],
    accessoriesColor: Colors.Shirt[0],
    hairColor: Colors.Hair[0],
  })

  await scene.steve.init()

  scene.addEntity(scene.steve)
}

function checkCheatKeys (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  checkCalendarCheatKeys(justDownKeys)
}

function checkCalendarCheatKeys (justDownKeys) {
  let timeKeyPressed = false
  if (justDownKeys.includes(Keys.NUMPAD_1)) {
    day++
    timeKeyPressed = true
  }
  if (justDownKeys.includes(Keys.NUMPAD_2)) {
    season++
    timeKeyPressed = true
  }
  if (justDownKeys.includes(Keys.NUMPAD_3)) {
    year++
    timeKeyPressed = true
  }

  if (timeKeyPressed) {
    dateCheck()
    console.log(seasonDisplay, day, 'Year', year)
  }
}

function dateCheck() {
  if (day >= (seasonLength + 1)) { //season length +1, since we're starting days at 1, we're adding 1 to the season length
    season++
    day = 1
  }

  if(season > 3) {
    year++
    season = 1
  }

  convertSeason()
}

function convertSeason () {
  switch(season){
  case 1: seasonDisplay = "Cool"
  break
  case 2: seasonDisplay = "Hot"
  break
  case 3: seasonDisplay = "Rainy"
  break
  }
}
