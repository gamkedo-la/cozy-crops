import Animation from '../../components/Animation.js'

export default class NPC {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    this.currentAnimation = null // Initialize once animations are built

    this.quest = null
    this.dialogue = {
      default: `Hello there!`
    }


    this.showingDialogue = false
  }

  init () {
    this.buildAnimations()

    this.currentAnimation = this.getAnimation()

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height

    this.collisionPoint = {
      x: this.x + this.currentAnimation.width / 2, // Center of the NPC
      y: this.y + this.currentAnimation.height // Bottom of the NPC
    }
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  update (deltaTime) {
    this.currentAnimation?.update(deltaTime)
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }

  checkCollision (player) {
    const playerColRow = this.scene.mapManager.getTileColRowAtPixelPos(player.collisionPoint.x, player.collisionPoint.y)
    const npcColRow = this.scene.mapManager.getTileColRowAtPixelPos(this.collisionPoint.x, this.collisionPoint.y)
    if (playerColRow.col === npcColRow.col && Math.abs(playerColRow.row - npcColRow.row) <= 1) {
      if (!this.showingDialogue) {
        this.showingDialogue = true
        this.scene.showNPCDialogue(this.type, this.getDialogue())
      }
    } else {
      this.showingDialogue = false
      this.scene.hideNPCDialogue(this.type)
    }
  }

  giveItem (item) {
    // override this method in subclasses
  }

  getDialogue () {
    // override this method in subclasses
    return this.dialogue.default
  }
}
