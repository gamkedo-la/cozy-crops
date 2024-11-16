import EntityTypes from '../../globals/EntityTypes.js'
import PortraitsImageData from '../../globals/PortraitsImageData.js'

export default class Portrait {
  constructor(config) {
    Object.assign(this, config)
    this.imagesData = getImageDatasForType(this.type)
    this.imagesData.image = this.scene.imageManager.getImageWithSrc(this.imagesData.complete.spritesheet)
    this.collisionPoint = { x: this.imagesData.complete.screenX + this.imagesData.complete.width / 2, y: this.imagesData.complete.screenY + this.imagesData.complete.height }
    this.text = `${this.achievement.name}\n${this.complete ? this.achievement.completeDescription : this.achievement.incompleteDescription}`
  }

  draw (camera) {
    const imageDataToUse = this.complete ? this.imagesData.complete : this.imagesData.incomplete
    this.scene.imageManager.draw(this.imagesData.image,
      imageDataToUse.screenX, imageDataToUse.screenY,
      imageDataToUse.width, imageDataToUse.height,
      imageDataToUse.x, imageDataToUse.y,
      camera
    )
  }

  checkForCollision (checkPoint) {
    return (checkPoint.x > this.imagesData.complete.screenX &&
    checkPoint.x < this.imagesData.complete.screenX + this.imagesData.complete.width &&
    checkPoint.y > this.imagesData.complete.screenY - this.imagesData.complete.height / 2 &&
    checkPoint.y < this.imagesData.complete.screenY + this.imagesData.complete.height)
  }

  displayText () {
    console.log(this.text)
    // this.scene.uiManager.displayText(this.imagesData.complete.text)
  }
}

function getImageDatasForType(type) {
  switch (type) {
    case EntityTypes.PortraitMona:
      return {
        complete: PortraitsImageData.MonaPortraitComplete,
        incomplete: PortraitsImageData.MonaPortraitIncomplete
      }
    case EntityTypes.PortraitPearl:
      return {
        complete: PortraitsImageData.PearlPortraitComplete,
        incomplete: PortraitsImageData.PearlPortraitIncomplete
      }
    case EntityTypes.PortraitRGB:
      return {
        complete: PortraitsImageData.RGBPortraitComplete,
        incomplete: PortraitsImageData.RGBPortraitIncomplete
      }
    case EntityTypes.PortraitStarry:
      return {
        complete: PortraitsImageData.StarryPortraitComplete,
        incomplete: PortraitsImageData.StarryPortraitIncomplete
      }
    case EntityTypes.PortraitWave:
      return {
        complete: PortraitsImageData.WavePortraitComplete,
        incomplete: PortraitsImageData.WavePortraitIncomplete
      } 
  }
}