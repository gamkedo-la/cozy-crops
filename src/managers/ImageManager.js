import Events from '../globals/Events.js'
import Images from '../globals/Images.js'
import { ImageScale } from '../globals/Constants.js'

export default class ImageManager {
  constructor (config) {
    Object.assign(this, config)

    this.images = {}
    this.srcToKeyMap = {}
    this.loadedCount = 0
    this.totalCount = Object.keys(Images).length
    this.internalCanvas = document.createElement('canvas')
    this.internalCanvas.width = this.game.canvas.width
    this.internalCanvas.height = this.game.canvas.height
    this.internalCtx = this.internalCanvas.getContext('2d')
    this.internalCtx.fillStyle = 'black'
  }

  async load () {
    const imagePromises = Object.keys(Images).map(async key => {
      const image = new Image()
      image.src = Images[key]
      this.srcToKeyMap[Images[key]] = key
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

  setCamera (camera) {
    this.camera = camera
  }

  getImage (imageKey) {
    return this.images[imageKey]
  }

  getImageWithSrc (src) {
    return this.images[this.srcToKeyMap[src]]
  }

  draw (image, x, y, width, height, imageX = 0, imageY = 0) {
    const cameraPos = this.camera.getTopLeft()
    this.internalCtx.drawImage(image, imageX, imageY, width, height, (x - cameraPos.x), (y - cameraPos.y), width, height)
  }

  drawGround(image) {
    // const ctx = this.internalCtx
    // const canvasWidth = this.internalCanvas.width
    // const canvasHeight = this.internalCanvas.height
  
    // Source rectangle (portion of the image to draw)
    const cameraPos = this.camera.getTopLeft()
    const sx = cameraPos.x
    const sy = cameraPos.y
    // const sWidth = canvasWidth
    // const sHeight = canvasHeight
  
    // Destination rectangle (where to draw on the canvas)
    // const dx = 0
    // const dy = 0
    // const dWidth = canvasWidth
    // const dHeight = canvasHeight
  
    this.internalCtx.drawImage(image, sx, sy, this.internalCanvas.width, this.internalCanvas.height, 0, 0, this.internalCanvas.width, this.internalCanvas.height)
  }

  drawKey (imageKey, x, y, width, height) {
    this.internalCtx.drawImage(this.images[imageKey], x, y, width, height)
  }

  render () {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    const cameraPos = this.camera.getTopLeft()
    this.game.ctx.drawImage(this.internalCanvas, 0, 0, this.internalCanvas.width, this.internalCanvas.height, 0, 0, ImageScale * this.game.canvas.width, ImageScale * this.game.canvas.height)
    this.internalCtx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height)
  }
}