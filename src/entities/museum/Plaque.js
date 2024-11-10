import EntityTypes from '../../globals/EntityTypes.js'
import PlaquesImageData from '../../globals/PlaquesImageData.js'

export default class Plaque {
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

// Set the text for the Complete plaques
// PlaquesImageData.FarmingPlaqueComplete.text = `You've earned this plaque on ${PlaquesImageData.FarmingPlaqueComplete.dateAchieved} by planting crops`
// PlaquesImageData.FishingPlaqueComplete.text = `You've earned this plaque on ${PlaquesImageData.FishingPlaqueComplete.dateAchieved} by catching a fish`
// PlaquesImageData.ForagingPlaqueComplete.text = `You've earned this plaque on ${PlaquesImageData.ForagingPlaqueComplete.dateAchieved} by collecting at least one wild plant`
// PlaquesImageData.FurniturePlaqueComplete.text = `You've earned this plaque on ${PlaquesImageData.FurniturePlaqueComplete.dateAchieved} by buying a piece of furniture`
// PlaquesImageData.SellingPlaqueComplete.text = `You've earned this plaque on ${PlaquesImageData.SellingPlaqueComplete.dateAchieved} by selling your first crop`
