import Scenes from '../globals/Scenes.js'
import BootScene from '../scenes/BootScene.js'
import TitleScene from '../scenes/TitleScene.js'
import GameScene from '../scenes/GameScene.js'

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

    this.scenes[Scenes.Title] = new TitleScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Title] = false

    this.scenes[Scenes.Game] = new GameScene({
      game: this.game,
      managers: this.managers
    })
    this.startedScenes[Scenes.Game] = false
  }

  add (scene) {
    this.scenes[scene.name] = scene
  }

  start () {
    this.currentScene.start()
    this.startedScenes[Scenes.Boot] = true
  }

  changeScene (sceneName) {
    if (this.scenes[sceneName]) {
      if (!this.startedScenes[sceneName]) {
        this.scenes[sceneName].start()
      }

      const previousScene = this.currentScene
      this.currentScene = this.scenes[sceneName]
      this.currentScene.start()
      previousScene.stop()
    }
  }

  update (deltaTime) {
    this.currentScene.update(deltaTime)
  }
}