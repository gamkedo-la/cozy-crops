import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Shopkeep from '../entities/npcs/Shopkeep.js'
import { BlacksmithPosition, BlacksmithEntrance, BlacksmithDialogPosition } from '../globals/BlacksmithMap.js'
import EntityTypes from '../globals/EntityTypes.js'
// import Plaque from '../entities/museum/Plaque.js'
// import Portrait from '../entities/museum/Portrait.js'
// import Statue from '../entities/museum/Statue.js'
import { UISprites } from '../globals/Images.js'
import { TextBackground } from '../globals/UISpriteData.js'


export default class BlacksmithScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.shopkeep = null
    this.blacksmithCamera = null
    this.drawlist = []
    this.shouldShowUI = false
    this.textBackground = null

  }

  init () {
    super.init() // Call the init method of the parent class

    // initialize resources
    const shopkeepData = this.gameManager.getNPCData(EntityTypes.Shopkeep)
    this.shopkeep = new Shopkeep({
      game: this.game,
      imageManager: this.imageManager,
      x: 100 - BlacksmithPosition.x,
      y: 50 - BlacksmithPosition.y,
      ...shopkeepData
    })
    this.shopkeep.init()
    this.drawlist.push(this.shopkeep)

    this.blacksmithCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this

      this.player.x = BlacksmithEntrance.x
      this.player.y = BlacksmithEntrance.y
      this.drawlist.push(this.player)
    }
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.shopkeep.update(deltaTime)
    if (this.player) {
      this.player.update(deltaTime)
    }

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('blacksmith', { x: null, y: null })

    if (this.shouldShowUI) {
    this.imageManager.draw(
      this.imageManager.getImageWithSrc(UISprites),
      BlacksmithDialogPosition.x - TextBackground.width / 2,
      BlacksmithDialogPosition.y,
      TextBackground.width,
      TextBackground.height,
      TextBackground.x,
      TextBackground.y,
      this.blacksmithCamera)
    }

    this.drawlist.sort((a, b) => {
      const aYToUse = a.collisionPoint?.y || a.screenY || a.y
      const bYToUse = b.collisionPoint?.y || b.screenY || b.y

      return aYToUse - bYToUse
    })

    this.drawlist.forEach(entity => entity.draw(this.blacksmithCamera))

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + BlacksmithPosition.x, newPosition.y + BlacksmithPosition.y, this.mapManager.blacksmithData)
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