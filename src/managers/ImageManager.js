import Events from '../globals/Events.js'
import Images from '../globals/Images.js'
import { ImageScale, SHADOWS_ENABLED } from '../globals/Constants.js'
import EntityTypes from '../globals/EntityTypes.js'

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
    this.overlayRed = 0
    this.overlayGreen = 0
    this.overlayBlue = 0
    this.overlayAlpha = 0
    this.textToDraw = []
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

  setOverlayColor (red = 0, green = 0, blue = 0, alpha = 0) {
    this.overlayRed = red
    this.overlayGreen = green
    this.overlayBlue = blue
    this.overlayAlpha = alpha
  }

  setOverlayAlpha (alpha) {
    this.overlayAlpha = alpha
  }

  getImage (imageKey) {
    return this.images[imageKey]
  }

  getPlayerImage (playerType) {
    switch (playerType) {
      case EntityTypes.Player1:
        return this.images.BasePlayer
      case EntityTypes.Player2:
        return this.images.BasePlayer2
    }
  }

  getImageWithSrc (src) {
    return this.images[this.srcToKeyMap[src]]
  }

  draw (image, x, y, width, height, imageX = 0, imageY = 0, camera = null, flipped = false, alpha = 1, drawShadow=true) {
    const cameraPos = camera ? camera.getTopLeft() : this.camera.getTopLeft()

    // Return early if the image is offscreen
    if(!this.isOnScreen(x, y, width, height, cameraPos)) return

    if (flipped) {
      this.internalCtx.save()
      const updatedX = (cameraPos.x - x) - width
      this.internalCtx.scale(-1, 1)
      this.internalCtx.drawImage(image, imageX, imageY, width, height, updatedX, (y - cameraPos.y), width, height)
      this.internalCtx.restore()
      if (drawShadow && SHADOWS_ENABLED) {
        this.internalCtx.save()
        this.internalCtx.scale(1, -1)
        this.internalCtx.globalCompositeOperation = "hue";
        this.internalCtx.globalAlpha = 0.15
        this.internalCtx.drawImage(image, imageX, imageY, width, height, (x - cameraPos.x), 2 -height*2 + -1*(y - cameraPos.y), width, height)
        this.internalCtx.restore()
      }
    } else {
      this.internalCtx.drawImage(image, imageX, imageY, width, height, (x - cameraPos.x), (y - cameraPos.y), width, height)
      if (drawShadow && SHADOWS_ENABLED) {
        this.internalCtx.save()
        this.internalCtx.scale(1, -1)
        this.internalCtx.globalCompositeOperation = "hue";
        this.internalCtx.globalAlpha = 0.15
        this.internalCtx.drawImage(image, imageX, imageY, width, height, (x - cameraPos.x), 2 -height*2 + -1*(y - cameraPos.y), width, height)
        this.internalCtx.restore()
      }
    }
  }

  isOnScreen (x, y, width, height, cameraPos = this.camera.getTopLeft()) {
    return !(
      x + width < cameraPos.x ||
      x > cameraPos.x + this.internalCanvas.width / ImageScale ||
      y + height < cameraPos.y ||
      y > cameraPos.y + this.internalCanvas.height / ImageScale
    )
  }

  drawGround(image, x, y, width = null, height = null) {
    const cameraPos = this.camera.getTopLeft()
    const sx = x || cameraPos.x
    const sy = y || cameraPos.y

    this.internalCtx.fillStyle = `rgba(0, 0, 0, 1)`
    this.internalCtx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height)
    this.internalCtx.drawImage(image, sx, sy, width, height, 0, 0, width, height)
  }

  drawKey (imageKey, x, y, width, height) {
    this.internalCtx.drawImage(this.images[imageKey], x, y, width, height)
  }

  drawText (text, x, y, font = '20px Arial', color = 'white') {
    this.textToDraw.push({ text, x: ImageScale * x, y: ImageScale * y, font, color })
  }

  render () {
    if (this.isFading || this.isUnfading) {
      return
    }

    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    this.game.ctx.drawImage(this.internalCanvas, 0, 0, this.internalCanvas.width, this.internalCanvas.height, 0, 0, ImageScale * this.game.canvas.width, ImageScale * this.game.canvas.height)

    this.textToDraw.forEach(text => {
      this.game.ctx.font = text.font
      this.game.ctx.fillStyle = text.color
      this.game.ctx.fillText(text.text, text.x, text.y)
    })

    this.drawOverlay()

    this.textToDraw = []
  }

  drawOverlay () {
    // Draw the overlay to fade to black (or back)
    this.game.ctx.fillStyle = `rgba(${this.overlayRed}, ${this.overlayGreen}, ${this.overlayBlue}, ${this.overlayAlpha})`
    this.game.ctx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height)
  }

  replaceColorInImage(image, oldColor, newColor) {
    try {
      // Create a temporary canvas
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      tempCanvas.width = image.width
      tempCanvas.height = image.height

      // Draw the image onto the temporary canvas
      tempCtx.drawImage(image, 0, 0)

      // Get the image data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
      const data = imageData.data

      // Define the old and new colors
      const [oldR, oldG, oldB, oldA] = oldColor
      const [newR, newG, newB, newA] = newColor

      // Loop through the image data and replace the old color with the new color
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] === oldR && data[i + 1] === oldG && data[i + 2] === oldB && (data[i + 3] === oldA || data[i + 3] - 5 === oldA)) {
          data[i] = newR
          data[i + 1] = newG
          data[i + 2] = newB
          data[i + 3] = newA
        }
      }

      // Put the modified image data back onto the canvas
      tempCtx.putImageData(imageData, 0, 0)

      return tempCanvas
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  replaceImageInImage (image, imageSource, imageData) {
    try {
      // Create a temporary canvas
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      tempCanvas.width = image.width
      tempCanvas.height = image.height

      // Draw the image to replace onto the temporary canvas
      tempCtx.drawImage(imageSource, imageData.x, imageData.y, imageData.frameWidth, imageData.frameHeight, 0, 0, imageData.frameWidth, imageData.frameHeight)
      return tempCanvas
    } catch (error) {
      console.error(error)
      throw error
    }
  }

// multiply each pixel and return a new sprite
tintImage(image,tintR=1,tintG=1,tintB=1,tintA=1) {
    try {
      // Create a temporary canvas
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      tempCanvas.width = image.width
      tempCanvas.height = image.height

      // Draw the image onto the temporary canvas
      tempCtx.drawImage(image, 0, 0)

      // Get the image data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
      const data = imageData.data

      // Loop through the image data
      for (let i = 0; i < data.length; i += 4) {
          data[i + 0] *= tintR
          data[i + 1] *= tintG
          data[i + 2] *= tintB
          data[i + 3] *= tintA
      }

      // Put the modified image data back onto the canvas
      tempCtx.putImageData(imageData, 0, 0)

      return tempCanvas
    } catch (error) {
      console.error(error)
      throw error
    }
  }

} // end Imagemanager class


