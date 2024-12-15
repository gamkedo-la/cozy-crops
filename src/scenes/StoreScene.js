import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Shopkeep from '../entities/npcs/Shopkeep.js'
import { StoreEntrance, StorePosition, StoreDialogPosition } from '../globals/StoreMap.js'
import EntityTypes from '../globals/EntityTypes.js'
import { UISprites } from '../globals/Images.js'
import { TextBackground } from '../globals/UISpriteData.js'
import { RegisterBottomLeft, RegisterBottomMiddle, RegisterBottomRight, RegisterTopLeft, RegisterTopMiddle, RegisterTopRight } from '../globals/TilesStore.js'


export default class StoreScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.shopkeep = null
    this.storeCamera = null
    this.drawlist = []
    this.shouldShowUI = false
    this.textBackground = null
    this.registerTiles = []
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    // initialize resources
    const shopkeepData = this.gameManager.getNPCData(EntityTypes.Shopkeep)
    this.shopkeep = new Shopkeep({
      game: this.game,
      scene: this,
      imageManager: this.imageManager,
      x: 100 - StorePosition.x,
      y: 50 - StorePosition.y,
      ...shopkeepData
    })
    this.shopkeep.init()
    this.drawlist.push(this.shopkeep)

    this.registerTiles = [RegisterBottomLeft, RegisterBottomMiddle, RegisterBottomRight, RegisterTopLeft, RegisterTopMiddle, RegisterTopRight]

    this.storeCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this

      this.player.x = StoreEntrance.x
      this.player.y = StoreEntrance.y
      this.drawlist.push(this.player)
    }
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.shopkeep.update(deltaTime)
    if (this.player) {
      this.player.update(deltaTime)
      this.shopkeep.checkCollision(this.player)
      this.checkMapCollision(this.player)
    }

    manageInput(this)
  }

  checkMapCollision (entity) {
    const tileIndex = this.mapManager.getTileAtPixelPos(entity.x + StorePosition.x, entity.y + StorePosition.y, this.mapManager.storeData)
    if (tileIndex && this.registerTiles.includes(tileIndex)) {
      this.shopkeep.showDialog(['buy', 'sell'])
    }
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('store', { x: null, y: null })

    if (this.shouldShowUI) {
    this.imageManager.draw(
      this.imageManager.getImageWithSrc(UISprites),
      StoreDialogPosition.x - TextBackground.width / 2,
      StoreDialogPosition.y,
      TextBackground.width,
      TextBackground.height,
      TextBackground.x,
      TextBackground.y,
      this.storeCamera)
    }

    this.drawlist.sort((a, b) => {
      const aYToUse = a.collisionPoint?.y || a.screenY || a.y
      const bYToUse = b.collisionPoint?.y || b.screenY || b.y

      return aYToUse - bYToUse
    })

    this.drawlist.forEach(entity => entity.draw(this.storeCamera))

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + StorePosition.x, newPosition.y + StorePosition.y, this.mapManager.storeData)
    if (!tileIndex) {
      returnToWorld(this)
    } else {
      return this.mapManager.collisionManager.playerCanWalk(tileIndex)  
    }
  }
}

function manageInput (scene) {
  // const downKeys = scene.inputManager.getDownKeys()

  // if (downKeys.includes(Keys.ESCAPE)) {
  //   // Go back to the game scene
  //   scene.player.x = scene.playerWorldPosition.x
  //   scene.player.y = scene.playerWorldPosition.y
  //   scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
  //   scene.game.changeScene(Scenes.Game)
  // }
}

function returnToWorld (scene) {
  scene.player.x = scene.playerWorldPosition.x
  scene.player.y = scene.playerWorldPosition.y
  scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
  scene.game.changeScene(Scenes.Game)
}