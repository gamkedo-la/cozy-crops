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
  }

  draw () {
    this.game.ctx.fillStyle = this.textColor
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.game.ctx.textAlign = 'left'
  
    this.options.forEach((selection, index) => {
      this.game.ctx.fillText(selection, this.x, this.y + index * this.fontSize * 1.5)
    })
  
    if (this.marker) {
      this.game.imageManager.draw(this.marker, this.x - this.fontSize * 1.5, this.y + this.selectionIndex * this.fontSize * 1.5)
    } else {
      this.game.ctx.fillText('>', this.x - this.fontSize, this.y + this.selectionIndex * this.fontSize * 1.5)
    }
  }
}

function draw (menu) {

}