export default class TitleScene {
  constructor (config) {
    this.game = config.game
    this.imageManager = config.imageManager
  }

  update (deltaTime) {
    // deltaTime is the time between frames (milliseconds)
    this.game.ctx.fillStyle = 'black'
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    this.game.ctx.drawImage(this.imageManager.images.TileSet, 0, 0, 512, 512, 0, 0, 512, 512)
  }
}