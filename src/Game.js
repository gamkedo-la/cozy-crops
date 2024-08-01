import ImageManager from "./managers/ImageManager.js"
import TitleScene from "./scenes/TitleScene.js"
import { CanvasHeight, CanvasWidth } from "./globals/Constants.js"

export default class Game {
  constructor () {
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('centered-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.scale = 2
    this.canvas.width = CanvasWidth
    this.canvas.height = CanvasHeight
    this.canvas.style.width = `${this.canvas.width * this.scale}px`
    this.canvas.style.height = `${this.canvas.height * this.scale}px`
    this.ctx.scale(this.scale, this.scale)
    this.ctx.imageSmoothingEnabled = false
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