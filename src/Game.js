import Constants from "./globals/Constants.js"
import ImageManager from "./managers/ImageManager.js"
import AudioManager from "./managers/AudioManager.js"
import FontManager from "./managers/FontManager.js"

import BootScene from "./scenes/BootScene.js"
import LoadScene from "./scenes/LoadScene.js"
import TitleScene from "./scenes/TitleScene.js"

export default class Game {
  constructor () {
    this.canvas = buildCanvas()
    this.ctx = buildContext(this.canvas)
    document.body.appendChild(this.canvas)

    this.lastTime = 0

    this.imageManager = new ImageManager()
    this.audioManager = new AudioManager()
    this.fontManager = new FontManager()

    this.scenes = buildScenes(this)
    this.currentScene = this.scenes.Boot

    this.start()
  }

  start () {
    // Do any one-time setup here, then call update()
    this.scenes.Boot.start(this.scenes.Load) // Start the boot scene
    console.log("Cassidy New Test")

    this.update(this.lastTime)
  }

  update (timestamp) {
    // deltaTime is the time between frames (milliseconds)
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp
    this.currentScene.update(deltaTime)
    requestAnimationFrame(timestamp => this.update(timestamp))
  }

  changeScene (scene) {
    this.currentScene = this.scenes[scene]
    this.currentScene.start()
  }
}

function buildCanvas () {
  const canvas = document.createElement('canvas')
  canvas.classList.add('centered-canvas')
  canvas.width = Constants.CanvasWidth
  canvas.height = Constants.CanvasHeight
  canvas.style.width = `${canvas.width * Constants.CanvasScale}px`
  canvas.style.height = `${canvas.height * Constants.CanvasScale}px`
  return canvas
}

function buildContext (canvas) {
  const ctx = canvas.getContext('2d')
  ctx.scale(Constants.CanvasScale, Constants.CanvasScale)
  ctx.imageSmoothingEnabled = false
  return ctx
}

function buildScenes (game) {
  return {
    Boot: new BootScene({
      game
    }),
    Load: new LoadScene({
      game,
      imageManager: game.imageManager,
      audioManager: game.audioManager
    }),
    Title: new TitleScene({
      game,
      imageManager: game.imageManager,
      audioManager: game.audioManager
    })
  }
}