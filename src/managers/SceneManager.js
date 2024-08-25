import Scenes from '../globals/Scenes.js'
import BootScene from '../scenes/BootScene.js'
import CreditsScene from '../scenes/CreditsScene.js'
import OptionsScene from '../scenes/OptionsScene.js'
import TitleScene from '../scenes/TitleScene.js'
import GameScene from '../scenes/GameScene.js'
import UIScene from '../scenes/UIScene.js'

export default class SceneManager {
  constructor (config) {
    Object.assign(this, config)
    this.managers.sceneManager = this

    this.scenes = {}
    this.startedScenes = {}
    this.buildScenes()

    this.currentScene = this.scenes.Boot
  }

  buildScenes () {
    this.scenes[Scenes.Boot] = new BootScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Boot] = false

    this.scenes[Scenes.Credits] = new CreditsScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Credits] = false

    this.scenes[Scenes.Game] = new GameScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Game] = false

    this.scenes[Scenes.Options] = new OptionsScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Options] = false

    this.scenes[Scenes.Title] = new TitleScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Title] = false

    this.scenes[Scenes.UIScene] = new UIScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.UIScene] = false
  }

  add (scene) {
    this.scenes[scene.name] = scene
  }

  async start () {
    await this.currentScene.start()
    this.startedScenes[Scenes.Boot] = true
  }

  async changeScene (sceneName) {
    if (this.scenes[sceneName]) {
      if (!this.startedScenes[sceneName]) {
        await this.scenes[sceneName].start()
        this.startedScenes[sceneName] = true
      }

      const previousScene = this.currentScene
      this.currentScene = this.scenes[sceneName]
      previousScene.stop()
    }

    if (this.currentScene.name === Scenes.Game) {
      if (this.scenes[Scenes.UIScene]) {
        await this.scenes[Scenes.UIScene].start()
        this.startedScenes[Scenes.UIScene] = true
      }
    } else {
      if (this.scenes[Scenes.UIScene]) {
        this.scenes[Scenes.UIScene].stop()
      }
    }
  }

  update (deltaTime) {
    this.currentScene.update(deltaTime)

    if (this.currentScene.name === Scenes.Game) {
      this.scenes[Scenes.UIScene].update(deltaTime)
    }
  }
}