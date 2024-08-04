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

    draw(this)
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class
    this.loadingTimer += deltaTime

    if (this.loadingTimer > 500) {
      this.loadingTimer -= 500

      updateLoadingText(this)
    }

    updateProgressText(this)
    draw (this)
  }

  stop () {
    super.stop() // Call the stop method of the parent class
  }
}

function registerForEvents(boot) {
  boot.eventManager.on(Events.LoadingComplete, () => {
    boot.sceneManager.changeScene(Scenes.Title)
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

function draw(boot) {
  boot.game.ctx.fillStyle = 'black'
  boot.game.ctx.fillRect(0, 0, boot.game.canvas.width, boot.game.canvas.height)

  boot.game.ctx.font = '15px Arial'
  boot.game.ctx.fillStyle = 'white'
  boot.game.ctx.textAlign = 'left'
  boot.game.ctx.textBaseline = 'middle'
  const text = boot.loadingText + '\n' + boot.progressText
  boot.game.ctx.fillText(boot.loadingText, (boot.game.canvas.width / (2 * CanvasScale)) - 35, boot.game.canvas.height / (2 * CanvasScale))

  boot.game.ctx.font = '6px Arial'
  boot.game.ctx.fillText(boot.progressText, (boot.game.canvas.width / (2 * CanvasScale)) - 35, (boot.game.canvas.height / (2 * CanvasScale)) + 30)
}