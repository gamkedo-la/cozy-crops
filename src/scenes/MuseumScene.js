import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Curator from '../entities/npcs/Curator.js'
import { MuseumEntrance, MuseumPosition, MuseumDialogPosition } from '../globals/MuseumMap.js'
import EntityTypes from '../globals/EntityTypes.js'
import Plaque from '../entities/museum/Plaque.js'
import Portrait from '../entities/museum/Portrait.js'
import Statue from '../entities/museum/Statue.js'
import { UISprites } from '../globals/Images.js'
import { TextBackground } from '../globals/UISpriteData.js'

export default class MuseumScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.curator = null
    this.museumCamera = null
    this.drawlist = []
    this.shouldShowUI = false
    this.textBackground = null
  }

  init () {
    super.init() // Call the init method of the parent class

    // initialize resources
    const curatorData = this.gameManager.getNPCData(EntityTypes.Curator)
    this.curator = new Curator({
      game: this.game,
      imageManager: this.imageManager,
      x: 100 - MuseumPosition.x,
      y: 50 - MuseumPosition.y,
      ...curatorData
    })
    this.curator.init()
    this.drawlist.push(this.curator)

    const achievements = this.game.gameManager.getAchievements()

    const plaqueTypes = [EntityTypes.PlaqueFarming, EntityTypes.PlaqueFishing, EntityTypes.PlaqueForaging, EntityTypes.PlaqueFurniture, EntityTypes.PlaqueSelling]
    this.plaques = buildPlaques(this, achievements.filter(achievement => plaqueTypes.includes(achievement.type)))

    const portraitTypes = [EntityTypes.PortraitMona, EntityTypes.PortraitPearl, EntityTypes.PortraitRGB, EntityTypes.PortraitStarry, EntityTypes.PortraitWave]
    this.portraits = buildPortraits(this, achievements.filter(achievement => portraitTypes.includes(achievement.type)))

    const statueTypes = [EntityTypes.StatueBust, EntityTypes.StatueFossil, EntityTypes.StatueMoai, EntityTypes.StatuePharaoh]
    this.statues = buildStatues(this, achievements.filter(achievement => statueTypes.includes(achievement.type)))

    this.drawlist.push(...this.statues)

    this.museumCamera = {
      getTopLeft: () => ({ x: 0, y: 0 }),
    }
  }

  start (data) {
    if (data?.player) {
      this.playerWorldPosition = { x: data.player.x, y: data.player.y }
      this.player = data.player
      this.player.scene = this
      this.player.x = MuseumEntrance.x
      this.player.y = MuseumEntrance.y
      this.drawlist.push(this.player)
    }

    // TODO: Get the status of all Plaques, Portraits, and Statues from the Game Manager
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    this.curator.update(deltaTime)
    if (this.player) {
      this.player.update(deltaTime)
      checkForExhibitCollision(this)
    }

    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('museum', { x: null, y: null })

    if (this.shouldShowUI) {
    this.imageManager.draw(
      this.imageManager.getImageWithSrc(UISprites),
      MuseumDialogPosition.x - TextBackground.width / 2,
      MuseumDialogPosition.y,
      TextBackground.width,
      TextBackground.height,
      TextBackground.x,
      TextBackground.y,
      this.museumCamera)
    }

    this.plaques.forEach(plaque => plaque.draw(this.museumCamera))
    this.portraits.forEach(portrait => portrait.draw(this.museumCamera))
    this.drawlist.sort((a, b) => {
      const aYToUse = a.collisionPoint?.y || a.screenY || a.y
      const bYToUse = b.collisionPoint?.y || b.screenY || b.y

      return aYToUse - bYToUse
    })
    this.drawlist.forEach(entity => entity.draw(this.museumCamera))


    this.imageManager.render()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  playerCanWalk (newPosition) {
    const tileIndex = this.mapManager.getTileAtPixelPos(newPosition.x + MuseumPosition.x, newPosition.y + MuseumPosition.y, this.mapManager.museumData)
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

function buildPlaques (scene, achievements) {
  const plaques = []

  let achievement = achievements.find(achievement => achievement.type === EntityTypes.PlaqueFarming)
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFarming,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PlaqueFishing)
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFishing,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PlaqueForaging)
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueForaging,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PlaqueFurniture)
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFurniture,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PlaqueSelling)
  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueSelling,
    complete: achievement?.complete || false,
    achievement
  }))

  return plaques
}

function buildPortraits (scene, achievements) {
  const portraits = []

  let achievement = achievements.find(achievement => achievement.type === EntityTypes.PortraitMona)
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitMona,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PortraitPearl)
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitPearl,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PortraitRGB)
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitRGB,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PortraitStarry)
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitStarry,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.PortraitWave)
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitWave,
    complete: achievement?.complete || false,
    achievement
  }))

  return portraits
}

function buildStatues (scene, achievements) {
  const statues = []

  let achievement = achievements.find(achievement => achievement.type === EntityTypes.StatueBust)
  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueBust,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.StatueFossil)
  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueFossil,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.StatueMoai)
  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueMoai,
    complete: achievement?.complete || false,
    achievement
  }))

  achievement = achievements.find(achievement => achievement.type === EntityTypes.StatuePharaoh)
  statues.push(new Statue({
    scene,
    type: EntityTypes.StatuePharaoh,
    complete: achievement?.complete || false,
    achievement
  }))

  return statues
}

function checkForExhibitCollision (scene)  {
  const playerCheckPoint = { x: scene.player.collisionPoint.x, y: scene.player.collisionPoint.y - scene.player.height / 2 }
  scene.shouldShowUI = false

  for (const plaque of scene.plaques) {
    if (plaque.checkForCollision(playerCheckPoint)) {
      plaque.displayText(true)
      scene.shouldShowUI = true
    } else {
      plaque.displayText(false)
    }
  }

  if (!scene.shouldShowUI) {
    for (const portrait of scene.portraits) {
      if (portrait.checkForCollision(playerCheckPoint)) {
        portrait.displayText(true)
        scene.shouldShowUI = true
      } else {
        portrait.displayText(false)
      }
    }
  }

  if (!scene.shouldShowUI) {
    for (const statue of scene.statues) {
      if (statue.checkForCollision(playerCheckPoint)) {
        statue.displayText(true)
        scene.shouldShowUI = true
      } else {
        statue.displayText(false)
      }
    }
  }
}