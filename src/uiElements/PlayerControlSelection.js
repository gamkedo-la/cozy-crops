import Keys from '../globals/Keys.js'

export default class PlayerControlSelection {
  constructor (config) {
    Object.assign(this, config)

    this.menuItems = []
    this.selections = setSelections(this, this.player)
    this.activeSelection = null

    this.game.ctx.fillStyle = this.textColor
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.game.ctx.textAlign = 'left'
  
    this.selections.forEach((selection, index) => {
      const metrics = this.game.ctx.measureText(selection)
      this.menuItems.push({
        selection,
        x: this.x,
        y: this.y + (index * this.fontSize * 1.5) - (this.fontSize * 0.25),
        width: metrics.width,
        height: this.fontSize * 1.5
      })
      this.game.ctx.fillText(selection, this.x, this.y + index * this.fontSize * 1.5)
    })
  }

  update (deltaTime) {
    const mousePos = this.scene.inputManager.getMousePosition()
    handleMouse(this, mousePos)

    const justDownKeys = this.scene.inputManager.getJustDownKeys()
    handleKeys(this, justDownKeys)
  }

  draw () {
    this.game.ctx.fillStyle = this.textColor
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.game.ctx.textAlign = 'left'
  
    this.selections.forEach((selection, index) => {
      this.game.ctx.fillText(selection, this.x, this.y + index * this.fontSize * 1.5)
    })
  }
}

function setSelections (menu, player) {
  const selections = []
  const playerControls = menu.scene.inputManager.getPlayerControls(player)
  for (const control in playerControls) {
    selections.push(`${control}: ${playerControls[control]}`)
  }

  return selections
}

function handleMouse (menu, mousePos) {
  let overButton = false
  menu.menuItems.forEach((menuItem, index) => {
    if (mousePos.x > menuItem.x && mousePos.x < menuItem.x + menuItem.width && mousePos.y > menuItem.y && mousePos.y < menuItem.y + menuItem.height) {
      menu.activeSelection = index
      overButton = true
    }
  })

  if (mousePos.justDown && overButton) menu.scene.clicked(menu.options[menu.activeSelection])
}

function handleKeys (menu, justDownKeys) {
  if (menu.activeSelection) {
    // Escape key deactivates the active selection, any other key sets the control
    if (justDownKeys.includes(Keys.ESCAPE)) {
      menu.activeSelection = null
    } else {
      const key = justDownKeys[0]
      const control = menu.selections[menu.activeSelection].split(': ')[0]
      menu.inputManager.setPlayerControl(menu.player, control, key)
      menu.activeSelection = null
    }
  }
}