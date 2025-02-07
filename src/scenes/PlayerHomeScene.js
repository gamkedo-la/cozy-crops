import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import { HomePosition, HomeEntrance, HomeDialogPosition, FurniturePositions, setWallpaper } from '../globals/PlayerHomeMap.js'
import { UISprites } from '../globals/Images.js'
import { TextBackground } from '../globals/UISpriteData.js'
import Furniture from '../entities/furniture/Furniture.js'
import EntityTypes from '../globals/EntityTypes.js'

export default class PlayerHomeScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.homeCamera = null
    this.drawlist = []
    this.shouldShowUI = false
    this.textBackground = null

    this.furnishings = []
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    this.homeCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }

    // buildFurnishings(this)
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this
      this.player.x = HomeEntrance.x
      this.player.y = HomeEntrance.y
      this.drawlist.push(this.player)
    }

    const allWallpaper = this.inventoryManager.getWallpaper()
    const allWallpaperTypes = allWallpaper.map(wallpaper => wallpaper.type)
    if (allWallpaperTypes.includes(EntityTypes.WallPaperAuburn)) {
      setWallpaper(EntityTypes.WallPaperAuburn)
    } else if (allWallpaperTypes.includes(EntityTypes.WallPaperGray)) {
      setWallpaper(EntityTypes.WallPaperGray)
    } else if (allWallpaperTypes.includes(EntityTypes.WallPaperStriped)) {
      setWallpaper(EntityTypes.WallPaperStriped)
    } else if (allWallpaperTypes.includes(EntityTypes.WallPaperTan)) {
      setWallpaper(EntityTypes.WallPaperTan)
    }

    this.mapManager.updateHomeMap()
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    if (this.player) {
      this.player.update(deltaTime)
    }

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('home', { x: null, y: null })

    if (this.shouldShowUI) {
    this.imageManager.draw(
      this.imageManager.getImageWithSrc(UISprites),
      HomeDialogPosition.x - TextBackground.width / 2,
      HomeDialogPosition.y,
      TextBackground.width,
      TextBackground.height,
      TextBackground.x,
      TextBackground.y,
      this.homeCamera)
    }

    this.drawlist.sort((a, b) => {
      const aYToUse = a.collisionPoint?.y || a.screenY || a.y
      const bYToUse = b.collisionPoint?.y || b.screenY || b.y

      return aYToUse - bYToUse
    })

    this.drawlist.forEach(entity => {
      if (entity.type === EntityTypes.Player1 || entity.type === EntityTypes.Player2) {
        entity.draw(this.homeCamera)
      } else {
        entity.draw(entity.x, entity.y, this.homeCamera)
      }
    })

    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + HomePosition.x, newPosition.y + HomePosition.y, this.mapManager.homeData)
    if (!tileIndex) {
      returnToWorld(this)
    } else {
      return this.mapManager.collisionManager.playerCanWalk(tileIndex)  
    }
  }

  playerIsNearBed () {
    // This is just stubbed out for now
    // const playerPosition = { x: this.player.x + HomePosition.x, y: this.player.y + HomePosition.y }
    // return this.mapManager.collisionManager.playerIsNearBed(playerPosition)
    return false
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

function buildFurnishings (scene) {
  const window1 = new Furniture({
    type: 'Window',
    game: scene.game,
    imageManager: scene.imageManager,
    x: FurniturePositions.Window1.x,
    y: FurniturePositions.Window1.y
  })
  window1.init()
  scene.drawlist.push(window1)

  const window2 = new Furniture({
    type: 'Window',
    game: scene.game,
    imageManager: scene.imageManager,
    x: FurniturePositions.Window2.x,
    y: FurniturePositions.Window2.y
  })
  window2.init()
  scene.drawlist.push(window2)

  const furnishingTypes = scene.furnishings.map(furnishing => furnishing.type)
  if (furnishingTypes.includes(EntityTypes.BedQueen)) {

  } else if (furnishingTypes.includes(EntityTypes.BedTwin)) {

  } else {
    const sleepingBag1 = new Furniture({
      type: EntityTypes.SleepingBag2,
      game: scene.game,
      imageManager: scene.imageManager,
      x: FurniturePositions.SleepingBag1.x,
      y: FurniturePositions.SleepingBag1.y
    })
    sleepingBag1.init()
    scene.drawlist.push(sleepingBag1)
  }

  for (const furnishing of scene.furnishings) {
    const newFurnishing = new Furniture({
      type: furnishing,
      game: scene.game,
      imageManager: scene.imageManager
    })

    newFurnishing.init()
    scene.drawlist.push(newFurnishing)
  }
}