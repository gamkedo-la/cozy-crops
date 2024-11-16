import EntityTypes from '../../globals/EntityTypes.js'
import StatuesImageData from '../../globals/StatuesImageData.js'
import { MuseumPosition, MuseumDialogPosition } from '../../globals/MuseumMap.js'
import { FamilyNames } from '../../globals/Fonts.js'

export default class Statue {
  constructor(config) {
    Object.assign(this, config)
    this.imagesData = getImageDatasForType(this.type)
    Object.assign(this, this.imagesData.complete)
    this.imagesData.image = this.scene.imageManager.getImageWithSrc(this.imagesData.complete.spritesheet)
    this.collisionPoint = { x: this.imagesData.complete.screenX + this.imagesData.complete.width / 2, y: this.imagesData.complete.screenY + this.imagesData.complete.height }
    this.text = getText(this)
    this.renderPosition = { x: this.imagesData.complete.screenX - MuseumPosition.x, y: this.imagesData.complete.screenY - MuseumPosition.y }
  }

  draw (camera) {
    if (this.complete) {
      this.scene.imageManager.draw(this.imagesData.image,
        this.renderPosition.x, this.renderPosition.y,
        this.imagesData.complete.width, this.imagesData.complete.height,
        this.imagesData.complete.x, this.imagesData.complete.y,
        camera
      )
    }

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
    checkPoint.y > this.renderPosition.y &&
    checkPoint.y < this.renderPosition.y + this.imagesData.complete.height)
  }

  displayText (shouldDisplay) {
    this.shouldDisplayText = shouldDisplay
  }
}

function getImageDatasForType(type) {
  switch (type) {
    case EntityTypes.StatueBust:
      return {
        complete: StatuesImageData.Bust
      }
    case EntityTypes.StatueFossil:
      return {
        complete: StatuesImageData.Fossil
      }
    case EntityTypes.StatueMoai:
      return {
        complete: StatuesImageData.MoaiHead
      }
    case EntityTypes.StatuePharaoh:
      return {
        complete: StatuesImageData.Pharaoh
      }
  }
}

function getText(statue) {
  let text = `${statue.complete ? statue.achievement.completeDescription : statue.achievement.incompleteDescription}`
  return text.split('\n')
}