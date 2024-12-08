import { CanvasClearColor } from '../globals/Constants.js'

export default class Scene {
  constructor (config) {
    Object.assign(this, config)
    Object.assign(this, config.managers)
    this.uiScene = null
    this.playerIsWalking = false
    this.showingNPCDialogue = false
  }

  init (data) {
    // called once
    this.uiScene = data.uiScene
  }

  start () {
    // called every time we switch to the scene
  }

  update (deltaTime) {
    // deltaTime is the time between frames (milliseconds)
    this.draw()
  }

  playerIsWalkingNow (value) {
    this.playerIsWalking = value
    if (value) this.uiScene.hideSignDialogue()
  }

  showNPCDialogue (npcType, dialogue, showGiveButton) {
    const justShowedDialog = this.uiScene.showDialogue(npcType, dialogue, showGiveButton)
    if (justShowedDialog) this.showingNPCDialogue = true
  }

  hideNPCDialogue (npcType) {
    const justHidDialog = this.uiScene.hideDialogue(npcType)
    if (justHidDialog) this.showingNPCDialogue = false
  }

  showGiftDialogue () {
    this.uiScene.showGiftDialogue()
  }

  hideGiftDialogue () {
    this.uiScene.hideGiftDialogue()
  }

  isGiftDialogueShowing () {
    return this.uiScene.giftDialogShowing
  }

  isSignDialogueShowing () {
    return this.uiScene.signDialogShowing
  }

  draw () {
    this.game.ctx.fillStyle = CanvasClearColor
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
  }

  stop () {
    // clean up resources
  }
}