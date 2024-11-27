import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Carpenter from '../entities/npcs/Carpenter.js'
import { CarpenterPosition, CarpenterEntrance, CarpenterDialogPosition } from '../globals/CarpenterMap.js'
import EntityTypes from '../globals/EntityTypes.js'
import { UISprites } from '../globals/Images.js'
import { TextBackground } from '../globals/UISpriteData.js'

export default class CarpenterScene extends Scene {
  constructor (config) {
    super(config)


    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.carpenter = null
    this.carpenterCamera = null
    this.drawlist = []
    this.shouldShowUI = false
    this.textBackground = null
  }

  init () {
    super.init() // Call the init method of the parent class

    const carpenterData = this.gameManager.getNPCData(EntityTypes.Carpenter)
    this.carpenter = new Carpenter({
      game: this.game,
      imageManager: this.imageManager,
      x: 100 - CarpenterPosition.x,
      y: 50 - CarpenterPosition.y,
      ...carpenterData
    })
    this.carpenter.init()
    this.drawlist.push(this.carpenter)

    this.carpenterCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this
      this.player.x = CarpenterEntrance.x
      this.player.y = CarpenterEntrance.y
      this.drawlist.push(this.player)
    }
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.carpenter.update(deltaTime)
    if (this.player) {
      this.player.update(deltaTime)
    }

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('carpenter', { x: null, y: null })

    if (this.shouldShowUI) {
    this.imageManager.draw(
      this.imageManager.getImageWithSrc(UISprites),
      CarpenterDialogPosition.x - TextBackground.width / 2,
      CarpenterDialogPosition.y,
      TextBackground.width,
      TextBackground.height,
      TextBackground.x,
      TextBackground.y,
      this.carpenterCamera)
    }

    this.drawlist.sort((a, b) => {
      const aYToUse = a.collisionPoint?.y || a.screenY || a.y
      const bYToUse = b.collisionPoint?.y || b.screenY || b.y

      return aYToUse - bYToUse
    })

    this.drawlist.forEach(entity => entity.draw(this.carpenterCamera))

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + CarpenterPosition.x, newPosition.y + CarpenterPosition.y, this.mapManager.carpenterData)
    if (!tileIndex) {
      returnToWorld(this)
    } else {
      return this.mapManager.collisionManager.playerCanWalk(tileIndex)  
    }
  }
}

function manageInput (scene) {
  const downKeys = scene.inputManager.getDownKeys()

  if (downKeys.includes(Keys.ESCAPE)) {
    // Go back to the game scene
    scene.player.x = scene.playerWorldPosition.x
    scene.player.y = scene.playerWorldPosition.y
    scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
    scene.game.changeScene(Scenes.Game)
  }
}

function returnToWorld (scene) {
  scene.player.x = scene.playerWorldPosition.x
  scene.player.y = scene.playerWorldPosition.y
  scene.player.scene = scene.game.sceneManager.scenes[Scenes.Game]
  scene.game.changeScene(Scenes.Game)
}