import Images from "../globals/Images.js"

export default class ImageManager {
  constructor () {
    this.images = {}
  }

  async load () {
    const imagePromises = Object.keys(Images).map(async key => {
      const image = new Image()
      image.src = Images[key]
      await new Promise(resolve => {
        image.onload = resolve
      })
      this.images[key] = image
    })

    await Promise.all(imagePromises)
  }
}