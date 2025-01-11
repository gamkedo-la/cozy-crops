import CanvasButton from './CanvasButton.js'
import UISpriteData from '../globals/UISpriteData.js'

export default class ColorButton extends CanvasButton {
  constructor (config) {
    config.sourceX = config.imgDims.x
    config.sourceY = config.imgDims.y
    config.width = config.imgDims.width
    config.height = config.imgDims.height
    config.x = config.left
    config.y = config.top
    super(config)
  }

  activate () {
    this.action(this.scene, this.color)
  }

  // draw () {
  //   if (!this.visible) return

  //   super.draw()

  //   if (this.disabled) {
  //     this.scene.game.ctx.globalAlpha = 0.5
  //   }

  //   this.scene.game.ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`
  //   this.scene.game.ctx.fillRect(this.rect.left + 8, this.rect.top + 8, this.rect.width - 16, this.rect.height - 16)

  //   if (this.disabled) {
  //     this.scene.game.ctx.globalAlpha = 1
  //   }
  // }
}