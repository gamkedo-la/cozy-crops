import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Keys from '../globals/Keys.js'
import Curator from '../entities/npcs/Curator.js'
import { MuseumEntrance, MuseumPosition } from '../globals/MuseumMap.js'
import EntityTypes from '../globals/EntityTypes.js'
import Plaque from '../entities/museum/Plaque.js'
import Portrait from '../entities/museum/Portrait.js'
import Statue from '../entities/museum/Statue.js'

export default class MuseumScene extends Scene {
  constructor (config) {
    super(config)

    this.player = null
    this.playerWorldPosition = { x: 0, y: 0 }
    this.curator = null
    this.museumCamera = null
    this.drawlist = []
  }

  init () {
    super.init() // Call the init method of the parent class

    // initialize resources
    this.curator = new Curator({
      game: this.game,
      imageManager: this.imageManager,
      x: 300,
      y: 150
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
    if (this.player) this.player.update(deltaTime)
    manageInput(this)
  }

  draw (scene) {
    super.draw() // Call the draw method of the parent class

    this.mapManager.drawMap('museum', { x: null, y: null })
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

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFarming,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PlaqueFarming)?.complete || false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFishing,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PlaqueFishing)?.complete || false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueForaging,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PlaqueForaging)?.complete || false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueFurniture,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PlaqueFurniture)?.complete || false
  }))

  plaques.push(new Plaque({
    scene,
    type: EntityTypes.PlaqueSelling,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PlaqueSelling)?.complete || false
  }))

  return plaques
}

function buildPortraits (scene, achievements) {
  const portraits = []
  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitMona,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PortraitMona)?.complete || false
  }))

  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitPearl,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PortraitPearl)?.complete || false
  }))

  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitRGB,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PortraitRGB)?.complete || false
  }))

  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitStarry,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PortraitStarry)?.complete || false
  }))

  portraits.push(new Portrait({
    scene,
    type: EntityTypes.PortraitWave,
    complete: achievements.find(achievement => achievement.type === EntityTypes.PortraitWave)?.complete
  }))

  return portraits
}

function buildStatues (scene, achievements) {
  const statues = []
  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueBust,
    complete: achievements.find(achievement => achievement.type === EntityTypes.StatueBust)?.complete || false
  }))

  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueFossil,
    complete: achievements.find(achievement => achievement.type === EntityTypes.StatueFossil)?.complete || false
  }))

  statues.push(new Statue({
    scene,
    type: EntityTypes.StatueMoai,
    complete: achievements.find(achievement => achievement.type === EntityTypes.StatueMoai)?.complete || false
  }))

  statues.push(new Statue({
    scene,
    type: EntityTypes.StatuePharaoh,
    complete: achievements.find(achievement => achievement.type === EntityTypes.StatuePharaoh)?.complete || false
  }))

  return statues
}