import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import { CanvasScale } from '../globals/Constants.js'
import Events from '../globals/Events.js'

export default class BootScene extends Scene {
  constructor (config) {
    super(config)
    this.name = Scenes.Boot

    this.loadingText = 'Loading'
    this.loadingTimer = 0
    this.progressText = `Images (${this.loadManager.imagesLoaded}/${this.loadManager.totalImages}, Audio (${this.loadManager.audioLoaded}/${this.loadManager.totalAudio}, Fonts (${this.loadManager.fontsLoaded}/${this.loadManager.totalFonts})`
  }

  start () {
    super.start() // Call the start method of the parent class

    registerForEvents(this)
    this.loadManager.load()

    this.draw()
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class
    this.loadingTimer += deltaTime

    if (this.loadingTimer > 500) {
      this.loadingTimer -= 500

      updateLoadingText(this)
    }

    updateProgressText(this)
    this.draw()
  }

  draw() {
    super.draw() // Call the draw method of the parent class

    this.game.ctx.font = '15px Arial'
    this.game.ctx.fillStyle = 'white'
    this.game.ctx.textAlign = 'left'
    this.game.ctx.textBaseline = 'middle'
    const text = this.loadingText + '\n' + this.progressText
    this.game.ctx.fillText(this.loadingText, (this.game.canvas.width / (2 * CanvasScale)) - 35, this.game.canvas.height / (2 * CanvasScale))
  
    this.game.ctx.font = '6px Arial'
    this.game.ctx.fillText(this.progressText, (this.game.canvas.width / (2 * CanvasScale)) - 35, (this.game.canvas.height / (2 * CanvasScale)) + 30)
  }

  stop () {
    super.stop() // Call the stop method of the parent class
  }
}

function registerForEvents(boot) {
  boot.eventManager.on(Events.LoadingComplete, async () => {
    await boot.sceneManager.changeScene(Scenes.Title)
  })
}

function updateLoadingText (boot) {
  if (boot.loadingText.length < 'Loading...'.length) {
    boot.loadingText += '.'
  } else {
    boot.loadingText = 'Loading'
  }
}

function updateProgressText(boot) {
  boot.progressText = `Images (${boot.loadManager.imagesLoaded}/${boot.loadManager.totalImages}), Audio (${boot.loadManager.audioLoaded}/${boot.loadManager.totalAudio}), Fonts (${boot.loadManager.fontsLoaded}/${boot.loadManager.totalFonts})`
}