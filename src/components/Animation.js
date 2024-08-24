export default class Animation {
  constructor (config) {
    Object.assign(this, config)

    this.spritesheet = config.canvas || this.imageManager.getImageWithSrc(this.imageSrc)
    this.currentFrameIndex = 0
    this.currentFrame = this.frames[this.currentFrameIndex]
    this.currentTime = 0
    this.width = this.frameWidth
    this.height = this.frameHeight
    this.frameWidth += 2 * this.padding
    this.frameHeight += 2 * this.padding
  }

  update (deltaTime) {
    this.currentTime += deltaTime
    if (this.currentTime >= this.duration) {
      if (this.currentFrameIndex === this.frames.length - 1 && !this.loop) {
        // Emit the Animation Complete event

        return
      }
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length
      this.currentFrame = this.frames[this.currentFrameIndex]
      this.currentTime -= this.duration
    }
  }

  draw (x, y) {
    const imageX = (this.currentFrame * this.frameWidth) % this.spritesheet.width
    const imageY = Math.floor((this.currentFrame * this.frameWidth) / this.spritesheet.width) * this.frameHeight
    this.imageManager.draw(this.spritesheet, x, y, this.frameWidth, this.frameHeight, imageX, imageY)
  }

  getCurrentFrame () {
    return this.currentFrame
  }
}