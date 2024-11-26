import UIAttributes from '../globals/UIAttributes.js'
import { UISprites } from '../globals/Images.js'
import UISpriteData from '../globals/UISpriteData.js'
import { FamilyNames } from '../globals/Fonts.js'

export default class PauseMenu {
  constructor(config) {
    Object.assign(this, config)
    
    this.options = [
      { text: 'Resume', action: () => this.scene.togglePause() },
      { text: 'Settings', action: () => console.log('Settings clicked') },
      { text: 'Return to Main', action: () => console.log('Return to Main clicked') }
    ]
    
    this.selectedOption = 0
    this.menuRect = {
      width: 400,
      height: 300,
      get left() { return (this.scene.game.canvas.width - this.width) / 2 },
      get top() { return (this.scene.game.canvas.height - this.height) / 2 }
    }
  }

  draw() {
    const ctx = this.scene.game.ctx
    
    // Semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height)
    
    // Menu background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(this.menuRect.left, this.menuRect.top, this.menuRect.width, this.menuRect.height)
    
    // Menu title
    ctx.fillStyle = 'black'
    ctx.font = `48px ${FamilyNames.FarmVintage}`
    ctx.textAlign = UIAttributes.CenterAlign
    ctx.fillText('Paused', this.scene.game.canvas.width / 2, this.menuRect.top + 60)
    
    // Menu options
    ctx.font = `36px ${FamilyNames.FarmVintage}`
    this.options.forEach((option, index) => {
      const y = this.menuRect.top + 120 + (index * 60)
      ctx.fillStyle = this.selectedOption === index ? '#4a90e2' : 'black'
      ctx.fillText(option.text, this.scene.game.canvas.width / 2, y)
    })
  }

  handleClick(x, y) {
    const optionHeight = 60
    const startY = this.menuRect.top + 90
    
    this.options.forEach((option, index) => {
      const optionY = startY + (index * optionHeight)
      if (y >= optionY && y <= optionY + optionHeight &&
          x >= this.menuRect.left && x <= this.menuRect.left + this.menuRect.width) {
        option.action()
      }
    })
  }

  handleKeyPress(key) {
    switch(key) {
      case 'ArrowUp':
        this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length
        break
      case 'ArrowDown':
        this.selectedOption = (this.selectedOption + 1) % this.options.length
        break
      case 'Enter':
        this.options[this.selectedOption].action()
        break
    }
  }
}
