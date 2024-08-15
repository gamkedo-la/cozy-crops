export default class Camera {
  constructor (config) {
    Object.assign(this, config)
    this.x = this.player1.x - this.game.canvas.width / 2
    this.y = this.player1.y - this.game.canvas.height / 2
  }

  update (deltaTime) {
    // this.x = ((this.player1.x + (this.player2 ? this.player2.x : 0)) / 2)
    // this.y = ((this.player1.y + (this.player2 ? this.player2.y : 0)) / 2)
    this.x = this.player1.x - this.game.canvas.width / 2
    this.y = this.player1.y - this.game.canvas.height / 2
  }

  getTopLeft () {
    return {
      x: this.x,
      y: this.y
    }
  }
}