import CanvasButton from './CanvasButton.js'
import { BasePlayer } from '../globals/Images.js'

export default class StyleButton extends CanvasButton {
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
    this.action(this.scene, this.style)
  }

  draw () {
    if (!this.visible) return

    super.draw()

    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 0.5
    }

    this.scene.game.ctx.drawImage(
      this.scene.imageManager.getImageWithSrc(BasePlayer),
      this.foreground.x,
      this.foreground.y,
      this.foreground.frameWidth,
      this.foreground.frameHeight,
      this.rect.left + 8,
      this.rect.top + 8,
      this.rect.width - 16,
      this.rect.height - 16
    )

    if (this.disabled) {
      this.scene.game.ctx.globalAlpha = 1
    }
  }
}