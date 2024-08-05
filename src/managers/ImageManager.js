import Events from '../globals/Events.js'
import Images from '../globals/Images.js'
import { ImageScale } from '../globals/Constants.js'

export default class ImageManager {
  constructor (config) {
    Object.assign(this, config)

    this.images = {}
    this.loadedCount = 0
    this.totalCount = Object.keys(Images).length
  }

  async load () {
    const imagePromises = Object.keys(Images).map(async key => {
      const image = new Image()
      image.src = Images[key]
      await new Promise(resolve => {
        this.eventManager.emit(Events.ImageLoaded)
        this.loadedCount++
        image.onload = resolve
      })
      this.images[key] = image
    })

    await Promise.all(imagePromises)

    this.eventManager.emit(Events.AllImagesLoaded)
  }

  draw (image, x, y, width, height) {
    this.game.ctx.drawImage(image, x, y, ImageScale * width, ImageScale * height)
  }

  drawKey (imageKey, x, y, width, height) {
    this.game.ctx.drawImage(this.images[imageKey], x, y, ImageScale * width, ImageScale * height)
  }
}