import Events from '../globals/Events.js'
import Images from '../globals/Images.js'
import { ImageScale } from '../globals/Constants.js'
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
    this.isFading = false
    this.isUnfading = false
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

  fadeToBlack() {
    return new Promise((resolve) => {
      console.log('Fading to black');
      this.isFading = true;
  
      const duration = 1500; // Duration of the fade in milliseconds
      const start = performance.now(); // Start time of the fade
      const initialAlpha = 0; // Initial alpha value
      const finalAlpha = 1; // Final alpha value
  
      const fade = (timestamp) => {
        const elapsed = timestamp - start; // Time elapsed since the start of the fade
        const progress = Math.min(elapsed / duration, 1); // Progress of the fade (0 to 1)
        const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress; // Current alpha value
  
        // Clear the canvas
        this.internalCtx.clearRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
  
        // Set the fill style with the current alpha value
        this.internalCtx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  
        // Fill the canvas with the current alpha value
        this.internalCtx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
  
        if (progress < 1) {
          // Continue the fade
          requestAnimationFrame(fade);
        } else {
          // Fade is complete, resolve the promise
          this.isFading = false;
          resolve();
        }
      };
  
      // Start the fade
      requestAnimationFrame(fade);
    });
  }

  unFadeFromBlack() {
    return new Promise((resolve) => {
      console.log('Unfading from black');
  
      this.isUnfading = true;
      const duration = 1500; // Duration of the fade in milliseconds
      const start = performance.now(); // Start time of the fade
      const initialAlpha = 1; // Initial alpha value
      const finalAlpha = 0; // Final alpha value
  
      const fade = (timestamp) => {
        const elapsed = timestamp - start; // Time elapsed since the start of the fade
        const progress = Math.min(elapsed / duration, 1); // Progress of the fade (0 to 1)
        const alpha = initialAlpha + (finalAlpha - initialAlpha) * progress; // Current alpha value
  
        // Clear the canvas
        this.internalCtx.clearRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
  
        // Set the fill style with the current alpha value
        this.internalCtx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  
        // Fill the canvas with the current alpha value
        this.internalCtx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
  
        if (progress < 1) {
          // Continue the fade
          requestAnimationFrame(fade);
        } else {
          // Fade is complete, resolve the promise
          this.isUnfading = false;
          resolve();
        }
      };
  
      // Start the fade
      requestAnimationFrame(fade);
    });
  }

  draw (image, x, y, width, height, imageX = 0, imageY = 0) {
    const cameraPos = this.camera.getTopLeft()
    this.internalCtx.drawImage(image, imageX, imageY, width, height, (x - cameraPos.x), (y - cameraPos.y), width, height)
  }

  drawGround(image) {
    const cameraPos = this.camera.getTopLeft()
    const sx = cameraPos.x
    const sy = cameraPos.y

    this.internalCtx.drawImage(image, sx, sy, this.internalCanvas.width, this.internalCanvas.height, 0, 0, this.internalCanvas.width, this.internalCanvas.height)
  }

  drawKey (imageKey, x, y, width, height) {
    this.internalCtx.drawImage(this.images[imageKey], x, y, width, height)
  }

  render () {
    if (this.isFading || this.isUnfading) {
      return
    }

    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    const cameraPos = this.camera.getTopLeft()
    this.game.ctx.drawImage(this.internalCanvas, 0, 0, this.internalCanvas.width, this.internalCanvas.height, 0, 0, ImageScale * this.game.canvas.width, ImageScale * this.game.canvas.height)
    this.internalCtx.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height)
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
}