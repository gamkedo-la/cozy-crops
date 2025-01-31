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
    this.game.ctx.textAlign = 'right'
  
    this.options.forEach((selection, index) => {
      const buttonData = getSpriteDataFromName(selection)
      const canvasRect = this.game.canvas.getBoundingClientRect()

      if (buttonData) {
        const button = new ImageButton({
          imageManager: this.scene.managers.imageManager,
          id: selection,
          top: `${this.y + (index * buttonData.height * 2) - buttonData.height}px`, //`${canvasRect.top + (canvasRect.height / 2) + (index * buttonData.height * 2) - (buttonData.height)}px`,
          left: `${canvasRect.left + (canvasRect.width / 2) - buttonData.width}px`,
          imgDims: buttonData,
          onClick: () => {
            this.scene.clicked(selection)
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
          y: this.y + (index * this.fontSize * 1.5),
          width: metrics.width,
          height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        })

        if (selection !== 'New Game') {
          this.game.ctx.textAlign = 'left'
          const removeMetrics = this.game.ctx.measureText('Remove')

          this.menuItems.push({
            selection: 'Remove',
            x: this.x + 25,
            y: this.y + (index * this.fontSize * 1.5),
            width: removeMetrics.width,
            height: removeMetrics.actualBoundingBoxAscent + removeMetrics.actualBoundingBoxDescent
          })

          this.game.ctx.textAlign = 'right'
        }
      }
    })

    window.addEventListener('resize', () => {
      this.menuItems.forEach((menuItem, index) => {
        if (menuItem.element) {
          const buttonData = getSpriteDataFromName(menuItem.element.id)
          const canvasRect = this.game.canvas.getBoundingClientRect()
          menuItem.element.style.top = `${canvasRect.top + (canvasRect.height / 2) + (index * buttonData.height * 2) - (buttonData.height)}px`
          menuItem.element.style.left = `${canvasRect.left + (canvasRect.width / 2) - buttonData.width}px`
        }
      })
    })
  }

  show () {
    this.menuItems.forEach(menuItem => {
      if (menuItem.element) {
        menuItem.show()
      }
    })
  }

  hide () {
    this.menuItems.forEach(menuItem => {
      if (menuItem.element) menuItem.hide()
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
  
    this.menuItems.forEach((menuItem, index) => {
      if (!menuItem.element) {
        if (menuItem.selection === 'Remove') {
          this.game.ctx.textAlign = 'left'
        } else {
          this.game.ctx.textAlign = 'right'
        }
        this.game.ctx.fillText(menuItem.selection, menuItem.x, menuItem.y)
      }
    })
  
    const canvasRect = this.game.canvas.getBoundingClientRect()

    if (this.marker) {
      this.game.imageManager.draw(this.marker, this.x - this.fontSize * 1.5, this.y + this.selectionIndex * this.fontSize * 1.5)
    } else {
      const selectedMenuItem = this.menuItems[this.selectionIndex]
      const selectedRect = selectedMenuItem.element ? selectedMenuItem.element.getBoundingClientRect() : { x: selectedMenuItem.x, y: selectedMenuItem.y, width: selectedMenuItem.width, height: selectedMenuItem.height }

      this.game.ctx.fillText('>',
        selectedRect.left - canvasRect.left - selectedRect.width / 4,
        selectedRect.top + selectedRect.height / 2
      )
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
      if (menuItem.selection === 'Remove') {
        console.log(mousePos.x > menuItem.x, mousePos.x < menuItem.x + menuItem.width, mousePos.y > (menuItem.y - menuItem.height / 2), mousePos.y < (menuItem.y + menuItem.height / 2))
        if (mousePos.x > menuItem.x && mousePos.x < menuItem.x + menuItem.width && mousePos.y > (menuItem.y - menuItem.height / 2) && mousePos.y < (menuItem.y + menuItem.height / 2)) {
          menu.selectionIndex = index
          overButton = true
        }  
      } else {
        if (mousePos.x > menuItem.x - menuItem.width && mousePos.x < menuItem.x && mousePos.y > (menuItem.y - menuItem.height / 2) && mousePos.y < (menuItem.y + menuItem.height / 2)) {
          menu.selectionIndex = index
          overButton = true
        }  
      }
    }
  })

  if (mousePos.justDown && overButton) {
    const item = menu.menuItems[menu.selectionIndex]
    if (item.element) {
      menu.scene.clicked(menu.options[menu.selectionIndex])
    } else if (item.selection === 'Remove') {
      menu.scene.clicked(menu.menuItems[menu.selectionIndex - 1].selection, true)
      menu.selectionIndex = 0
    } else {
      menu.scene.clicked(item.selection)
    }
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