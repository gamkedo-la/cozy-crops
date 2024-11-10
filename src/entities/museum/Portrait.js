import EntityTypes from '../../globals/EntityTypes.js'
import PortraitsImageData from '../../globals/PortraitsImageData.js'

export default class Portrait {
  constructor(config) {
    Object.assign(this, config)
    this.imagesData = getImageDatasForType(this.type)
    this.imagesData.image = this.scene.imageManager.getImageWithSrc(this.imagesData.complete.spritesheet)
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