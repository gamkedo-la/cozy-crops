import EntityTypes from '../../globals/EntityTypes.js'
import StatuesImageData from '../../globals/StatuesImageData.js'

export default class Statue {
  constructor(config) {
    Object.assign(this, config)
    this.imagesData = getImageDatasForType(this.type)
    Object.assign(this, this.imagesData.complete)
    this.imagesData.image = this.scene.imageManager.getImageWithSrc(this.imagesData.complete.spritesheet)
    this.collisionPoint = { x: this.imagesData.complete.screenX + this.imagesData.complete.width / 2, y: this.imagesData.complete.screenY + this.imagesData.complete.height }
    this.text = `${this.achievement.name}\n${this.complete ? this.achievement.completeDescription : this.achievement.incompleteDescription}`
  }

  draw (camera) {
    if (this.complete) {
      this.scene.imageManager.draw(this.imagesData.image,
        this.imagesData.complete.screenX, this.imagesData.complete.screenY,
        this.imagesData.complete.width, this.imagesData.complete.height,
        this.imagesData.complete.x, this.imagesData.complete.y,
        camera
      )
    }
  }

  checkForCollision (checkPoint) {
    return (checkPoint.x > this.imagesData.complete.screenX &&
    checkPoint.x < this.imagesData.complete.screenX + this.imagesData.complete.width &&
    checkPoint.y > this.imagesData.complete.screenY &&
    checkPoint.y < this.imagesData.complete.screenY + this.imagesData.complete.height)
  }

  displayText () {
    console.log(this.text)
    // this.scene.uiManager.displayText(this.imagesData.complete.text)
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