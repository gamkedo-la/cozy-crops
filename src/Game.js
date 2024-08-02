import ImageManager from "./managers/ImageManager.js"
import TitleScene from "./scenes/TitleScene.js"
import Constants from "./globals/Constants.js"

export default class Game {
  constructor () {
    this.canvas = buildCanvas()
    this.ctx = buildContext(this.canvas)
    document.body.appendChild(this.canvas)

    this.imageManager = new ImageManager()
    this.scenes = {
      Title: new TitleScene({
        game: this,
        imageManager: this.imageManager
      }),
    }

    this.currentScene = this.scenes.Title

    // Call this.load() to start the game at the end of the constructor
    this.load()
  }

  async load () {
    await this.imageManager.load()

    // do this after everything is loaded
    this.start()
  }

  start () {
    // Do any one-time setup here, then call update()
    this.update()
  }

  update () {
    this.currentScene.update()
    requestAnimationFrame(() => this.update())
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