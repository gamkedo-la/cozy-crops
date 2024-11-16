import Scenes from '../globals/Scenes.js'
import BootScene from '../scenes/BootScene.js'
import CreditsScene from '../scenes/CreditsScene.js'
import MuseumScene from '../scenes/MuseumScene.js'
import OptionsScene from '../scenes/OptionsScene.js'
import PlayerHomeScene from '../scenes/PlayerHomeScene.js'
import PreGameScene from '../scenes/PreGameScene.js'
import StoreScene from '../scenes/StoreScene.js'
import TitleScene from '../scenes/TitleScene.js'
import GameScene from '../scenes/GameScene.js'
import UIScene from '../scenes/UIScene.js'

export default class SceneManager {
  constructor (config) {
    Object.assign(this, config)
    this.managers.sceneManager = this

    this.scenes = {}
    this.initializedScenes = {}
    this.buildScenes()

    this.currentScene = this.scenes.Boot
  }

  buildScenes () {
    this.scenes[Scenes.Boot] = new BootScene({
      name: Scenes.Boot,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Boot] = false

    this.scenes[Scenes.Credits] = new CreditsScene({
      name: Scenes.Credits,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Credits] = false

    this.scenes[Scenes.Game] = new GameScene({
      name: Scenes.Game,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Game] = false

    this.scenes[Scenes.Museum] = new MuseumScene({
      name: Scenes.Museum,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Museum] = false

    this.scenes[Scenes.Options] = new OptionsScene({
      name: Scenes.Options,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Options] = false

    this.scenes[Scenes.PlayerHome] = new PlayerHomeScene({
      name: Scenes.PlayerHome,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.PlayerHome] = false

    this.scenes[Scenes.PreGame] = new PreGameScene({
      name: Scenes.PreGame,
      game: this.game,
      managers: this.managers
    })

    this.scenes[Scenes.Store] = new StoreScene({
      name: Scenes.Store,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Store] = false

    this.scenes[Scenes.Title] = new TitleScene({
      name: Scenes.Title,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.Title] = false

    this.scenes[Scenes.UIScene] = new UIScene({
      name: Scenes.UIScene,
      game: this.game,
      managers: this.managers
    })
    this.initializedScenes[Scenes.UIScene] = false
  }

  add (scene) {
    this.scenes[scene.name] = scene
  }

  init () {
    this.currentScene.init()
    this.initializedScenes[Scenes.Boot] = true
  }

  changeScene (sceneName, data) {
    fadeOut(this.managers.imageManager, () => {
      if (this.scenes[sceneName]) {
        if (!this.initializedScenes[sceneName]) {
          this.scenes[sceneName].init(data)
          this.initializedScenes[sceneName] = true
        }

        this.scenes[sceneName].start(data)
        const previousScene = this.currentScene
        this.currentScene = this.scenes[sceneName]
        previousScene.stop()
      }

      if (this.currentScene.name === Scenes.Game) {
        if (this.scenes[Scenes.UIScene]) {
          this.scenes[Scenes.UIScene].init(this.currentScene)
          this.initializedScenes[Scenes.UIScene] = true
        }
      } else {
        if (this.scenes[Scenes.UIScene]) {
          this.scenes[Scenes.UIScene].stop()
        }
      }

      fadeIn(this.managers.imageManager, () => {})
    })
  }

  update (deltaTime) {
    this.currentScene.update(deltaTime)

    if (this.currentScene.name === Scenes.Game) {
      this.scenes[Scenes.UIScene].update(deltaTime)
    }
  }
}

function fadeOut (imageManager, callback) {
  const duration = 500 // Duration of the fade in milliseconds
  const start = performance.now() // Start time of the fade
  const initialAlpha = 0 // Initial alpha value
  const finalAlpha = 1 // Final alpha value

  const fade = (timestamp) => {
    const elapsed = timestamp - start // Time elapsed since the start of the fade
    const progress = Math.min(elapsed / duration, 1) // Progress of the fade (0 to 1)
    const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress // Current alpha value

    imageManager.setOverlayAlpha(alpha)

    if (progress < 1) {
      // Continue the fade
      requestAnimationFrame(fade)
    } else {
      callback()
    }
  }

  // Start the fade
  requestAnimationFrame(fade)
}

function fadeIn (imageManager, callback) {
  const duration = 500 // Duration of the fade in milliseconds
  const start = performance.now() // Start time of the fade
  const initialAlpha = 1 // Initial alpha value
  const finalAlpha = 0 // Final alpha value

  const fade = (timestamp) => {
    const elapsed = timestamp - start // Time elapsed since the start of the fade
    const progress = Math.min(elapsed / duration, 1) // Progress of the fade (0 to 1)
    const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress // Current alpha value

    imageManager.setOverlayAlpha(alpha)

    if (progress < 1) {
      // Continue the fade
      requestAnimationFrame(fade)
    } else {
      callback()
    }
  }

  // Start the fade
  requestAnimationFrame(fade)
}