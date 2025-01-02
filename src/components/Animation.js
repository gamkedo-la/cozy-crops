export default class Animation {
  /**
   * @param {Object} config
   * @param {HTMLImageElement|HTMLCanvasElement} [config.canvas] - The spritesheet or canvas to draw from.
   * @param {Object} config.imageManager - Manager to handle the draw calls.
   * @param {string} [config.imageSrc] - Fallback if config.canvas is not provided.
   * @param {number} config.frameWidth - Width of each frame in the spritesheet.
   * @param {number} config.frameHeight - Height of each frame in the spritesheet.
   * @param {number[]} config.frames - The frame indices in the animation cycle.
   * @param {number} config.duration - Time in ms or s each frame is displayed (depends on your engine).
   * @param {boolean} [config.loop=true] - Whether the animation loops after its final frame.
   * @param {number} [config.padding=0] - Padding around frames if needed.
   * @param {boolean} [config.flipped=false] - If true, the animation is drawn flipped horizontally.
   */
  constructor(config) {
    // Merge config into `this`
    Object.assign(this, {
      loop: true,
      padding: 0,
      flipped: false, // default
      ...config
    });

    // If a canvas was not provided, fetch from ImageManager
    this.spritesheet =
      config.canvas ||
      this.imageManager.getImageWithSrc(this.imageSrc);

    // Initialize animation state
    this.currentFrameIndex = 0;
    this.currentFrame = this.frames[this.currentFrameIndex];
    this.currentTime = 0;

    // Original frame dimensions (no padding)
    this.width = this.frameWidth;
    this.height = this.frameHeight;

    // Expand for optional padding
    this.frameWidth += 2 * this.padding;
    this.frameHeight += 2 * this.padding;
  }

  /**
   * Updates the animation frame based on the elapsed time.
   * @param {number} deltaTime - Elapsed time since last update call.
   */
  update(deltaTime) {
    this.currentTime += deltaTime;
    if (this.currentTime >= this.duration) {
      // If we reached the end of the animation & not looping => do nothing or emit event
      if (this.currentFrameIndex === this.frames.length - 1 && !this.loop) {
        // Potentially emit an "animation complete" event
        return;
      }

      // Move to next frame
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % this.frames.length;
      this.currentFrame = this.frames[this.currentFrameIndex];

      // Subtract the duration
      this.currentTime -= this.duration;
    }
  }

  /**
   * Draws the current frame onto the screen via imageManager.
   * @param {number} x - X position on screen/world.
   * @param {number} y - Y position on screen/world.
   * @param {Object} camera - A camera or offset object (depends on your engine).
   */
  draw(x, y, camera) {
    // Calculate sub-image coordinates
    const imageX =
      (this.currentFrame * this.frameWidth) % this.spritesheet.width;
    const imageY =
      Math.floor(
        (this.currentFrame * this.frameWidth) / this.spritesheet.width
      ) * this.frameHeight;

    // Draw
    this.imageManager.draw(
      this.spritesheet,
      x, // screen X
      y, // screen Y
      this.frameWidth,
      this.frameHeight,
      imageX,
      imageY,
      camera,
      this.flipped  // pass along the flipped status
    );
  }

  /**
   * Returns info about the current frame: its index and bounding box in the spritesheet.
   */
  getCurrentFrame() {
    return {
      index: this.currentFrameIndex,
      x:
        (this.frames[this.currentFrameIndex] * this.frameWidth) %
        this.spritesheet.width,
      y:
        Math.floor(
          (this.frames[this.currentFrameIndex] * this.frameWidth) /
            this.spritesheet.width
        ) * this.frameHeight,
      width: this.frameWidth,
      height: this.frameHeight
    };
  }

  /**
   * If you wish to retrieve or reset the initial frame, you can do it here.
   * (Currently returns the first frame or an object describing it.)
   */
  getInitialFrame() {
    return {
      index: 0,
      x: 0,
      y: 0,
      width: this.frameWidth,
      height: this.frameHeight
    };
  }

  /**
   * Sets whether the animation is flipped horizontally.
   * @param {boolean} flip - True if the sprite should be flipped
   */
  setFlipped(flip) {
    this.flipped = flip;
  }

  /**
   * Toggles the flipped state. 
   */
  flip() {
    this.flipped = !this.flipped;
  }
}
