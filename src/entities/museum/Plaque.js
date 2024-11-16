import EntityTypes from '../../globals/EntityTypes.js'
import PlaquesImageData from '../../globals/PlaquesImageData.js'
import { MuseumPosition } from '../../globals/MuseumMap.js'

export default class Plaque {
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
      imageDataToUse.screenX - MuseumPosition.x, imageDataToUse.screenY - MuseumPosition.y,
      imageDataToUse.width, imageDataToUse.height,
      imageDataToUse.x, imageDataToUse.y,
      camera
    )
  }

  checkForCollision (checkPoint) {
    return (checkPoint.x > this.imagesData.complete.screenX &&
    checkPoint.x < this.imagesData.complete.screenX + this.imagesData.complete.width &&
    checkPoint.y > this.imagesData.complete.screenY - this.imagesData.complete.height &&
    checkPoint.y < this.imagesData.complete.screenY + this.imagesData.complete.height)
  }

  displayText () {
    console.log(this.text)
    // this.scene.uiManager.displayText(this.imagesData.complete.text)
  }
}

function getImageDatasForType(type) {
  switch (type) {
    case EntityTypes.PlaqueFarming:
      return {
        complete: PlaquesImageData.FarmingPlaqueComplete,
        incomplete: PlaquesImageData.FarmingPlaqueIncomplete
      }
    case EntityTypes.PlaqueFishing:
      return {
        complete: PlaquesImageData.FishingPlaqueComplete,
        incomplete: PlaquesImageData.FishingPlaqueIncomplete
      }
    case EntityTypes.PlaqueForaging:
      return {
        complete: PlaquesImageData.ForagingPlaqueComplete,
        incomplete: PlaquesImageData.ForagingPlaqueIncomplete
      }
    case EntityTypes.PlaqueFurniture:
      return {
        complete: PlaquesImageData.FurniturePlaqueComplete,
        incomplete: PlaquesImageData.FurniturePlaqueIncomplete
      }
    case EntityTypes.PlaqueSelling:
      return {
        complete: PlaquesImageData.SellingPlaqueComplete,
        incomplete: PlaquesImageData.SellingPlaqueIncomplete
      } 
  }
}
