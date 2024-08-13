export default class Animation {
  constructor (config) {
    Object.assign(this, config)
    this.currentFrameIndex = 0
    this.currentFrame = this.frames[this.currentFrameIndex]
    this.currentTime = 0
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

  getCurrentFrame () {
    return this.currentFrame
  }
}