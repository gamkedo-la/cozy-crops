import EntityTypes from '../../globals/EntityTypes.js'
import PortraitsImageData from '../../globals/PortraitsImageData.js'
import { MuseumPosition, MuseumDialogPosition } from '../../globals/MuseumMap.js'
import { FamilyNames } from '../../globals/Fonts.js'

export default class Portrait {
  constructor(config) {
    Object.assign(this, config)
    this.imagesData = getImageDatasForType(this.type)
    this.imagesData.image = this.scene.imageManager.getImageWithSrc(this.imagesData.complete.spritesheet)
    this.collisionPoint = { x: this.imagesData.complete.screenX + this.imagesData.complete.width / 2, y: this.imagesData.complete.screenY + this.imagesData.complete.height }
    this.renderPosition = { x: this.imagesData.complete.screenX - MuseumPosition.x, y: this.imagesData.complete.screenY - MuseumPosition.y }
    this.text = getText(this)
    this.shouldDisplayText = false
  }

  draw (camera) {
    const imageDataToUse = this.complete ? this.imagesData.complete : this.imagesData.incomplete
    this.scene.imageManager.draw(this.imagesData.image,
      this.renderPosition.x, this.renderPosition.y,
      imageDataToUse.width, imageDataToUse.height,
      imageDataToUse.x, imageDataToUse.y,
      camera
    )

    if (this.shouldDisplayText) {
      this.scene.imageManager.drawText(this.achievement.name, MuseumDialogPosition.x, MuseumDialogPosition.y + 12, `48px ${FamilyNames.FarmVintage}`, 'black')
      let y = MuseumDialogPosition.y + 30
      this.text.forEach(line => {
        this.scene.imageManager.drawText(line, MuseumDialogPosition.x, y, `40px ${FamilyNames.FarmVintage}`, 'black')
        y += 10
      })
    }
  }

  checkForCollision (checkPoint) {
    return (checkPoint.x > this.renderPosition.x &&
    checkPoint.x < this.renderPosition.x + this.imagesData.complete.width &&
    checkPoint.y > this.renderPosition.y - this.imagesData.complete.height / 2 &&
    checkPoint.y < this.renderPosition.y + this.imagesData.complete.height)
  }

  displayText (shouldDisplay) {
    this.shouldDisplayText = shouldDisplay
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

function getText(portrait) {
  let text = `${portrait.complete ? portrait.achievement.completeDescription : portrait.achievement.incompleteDescription}`
  return text.split('\n')
}