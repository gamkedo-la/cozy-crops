import UISpriteData from '../globals/UISpriteData.js'
import ImageButton from './ImageButton.js'

export default class Menu {
  /**
   * 
   * @param {Object} config {
   * x: number, y: number, game: Game, scene: Scene, options: string[], textColor: string, fontSize: number, fontFamily: string, marker: string 
   * }
   */
  constructor (config) {
    Object.assign(this, config)

    this.selectionIndex = 0
    this.menuItems = []

    this.game.ctx.fillStyle = this.textColor
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.game.ctx.textAlign = 'left'
  
    this.options.forEach((selection, index) => {
      const buttonData = getSpriteDataFromName(selection)
      if (buttonData) {
        const button = new ImageButton({
          imageManager: this.scene.managers.imageManager,
          id: selection,
          top: `${this.y + (index * buttonData.height * 2) - (buttonData.height)}px`,
          left: `${this.x + 2 * buttonData.width}px`,
          imgDims: buttonData,
          onClick: () => {
            this.scene.clicked(selection)
            this.menuItems.forEach(item => {
              if (item.element) document.body.removeChild(item.element)
            })
          }
        })

        document.body.appendChild(button.element)
        this.menuItems.push(button)
        button.show()
      } else {
        const metrics = this.game.ctx.measureText(selection)
        this.menuItems.push({
          selection,
          x: this.x,
          y: this.y + (index * this.fontSize * 1.5) - (this.fontSize * 0.25),
          width: metrics.width,
          height: this.fontSize * 1.5
        })
        this.game.ctx.fillText(selection, this.x, this.y + index * this.fontSize * 1.5)  
      }
    })
  }

  moveUp () {
    this.selectionIndex--
    if (this.selectionIndex < 0) {
      this.selectionIndex = this.options.length - 1
    }
  }

  moveDown () {
    this.selectionIndex++
    if (this.selectionIndex >= this.options.length) {
      this.selectionIndex = 0
    }
  }

  getCurrentSelection () {
    return this.options[this.selectionIndex]
  }

  update (deltaTime) {
    const mousePos = this.scene.inputManager.getMousePosition()
    handleMouse(this, mousePos)
  }

  draw () {
    this.game.ctx.fillStyle = this.textColor
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.game.ctx.textAlign = 'left'
  
    // this.options.forEach((selection, index) => {
    //   this.game.ctx.fillText(selection, this.x, this.y + index * this.fontSize * 1.5)
    // })
    this.menuItems.forEach((menuItem, index) => {
      if (!menuItem.element) {
        this.game.ctx.fillText(menuItem.selection, this.x, this.y + index * this.fontSize * 1.5)
      }
    })
  
    if (this.marker) {
      this.game.imageManager.draw(this.marker, this.x - this.fontSize * 1.5, this.y + this.selectionIndex * this.fontSize * 1.5)
    } else {
      this.game.ctx.fillText('>', this.x - this.fontSize, this.y + this.selectionIndex * this.fontSize * 1.5)
    }
  }
}

function handleMouse (menu, mousePos) {
  let overButton = false
  menu.menuItems.forEach((menuItem, index) => {
    if (menuItem.element) {
      const canvasRect = menu.game.canvas.getBoundingClientRect()
      const rect = menuItem.element.getBoundingClientRect()
      if (mousePos.x > rect.x - canvasRect.x && mousePos.x < rect.x + rect.width - canvasRect.x && mousePos.y > rect.y - canvasRect.y && mousePos.y < rect.y + rect.height - canvasRect.y) {
        menu.selectionIndex = index
        overButton = true
      }
    } else {
      if (mousePos.x > menuItem.x && mousePos.x < menuItem.x + menuItem.width && mousePos.y > menuItem.y && mousePos.y < menuItem.y + menuItem.height) {
        menu.selectionIndex = index
        overButton = true
      }  
    }
  })

  if (mousePos.justDown && overButton) {
    menu.scene.clicked(menu.options[menu.selectionIndex])
  }
}

function getSpriteDataFromName (name) {
  switch (name) {
    case 'Back': return UISpriteData.BackButton
    case 'Cancel': return UISpriteData.CancelButton
    case 'Confirm': return UISpriteData.ConfirmButton
    case 'Credits': return UISpriteData.CreditsButton
    case 'Drop': return UISpriteData.DropButton
    case 'Options': return UISpriteData.OptionsButton
    case 'Start': return UISpriteData.StartButton
    default: return null
  }
}