import Events from "../globals/Events.js"
import { LoadingComplete } from "../globals/Events.js"

export default class LoadManager {
  constructor (config) {
    Object.assign(this, config)

    this.imagesLoaded = 0
    this.totalImages = this.imageManager.totalCount

    this.audioLoaded = 0
    this.totalAudio = this.audioManager.totalCount

    this.fontsLoaded = 0
    this.totalFonts = this.fontManager.totalCount
  }

  async load () {
    registerForEvents(this)

    const loadingPromises = [
      this.imageManager.load(),
      this.audioManager.load(),
      this.fontManager.load()
    ]

    await Promise.allSettled(loadingPromises)
    this.eventManager.emit(LoadingComplete)
  }
}

function registerForEvents(loader) {
  loader.eventManager.on(Events.ImageLoaded, () => {
    loader.imagesLoaded++
  })
  loader.eventManager.on(Events.AudioLoaded, () => {
    loader.audioLoaded++
  })
  loader.eventManager.on(Events.FontLoaded, () => {
    loader.fontsLoaded++
  })
}
