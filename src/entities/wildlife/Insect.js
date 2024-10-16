import ButterflyAnimations from '../../globals/ButterflyAnimations.js'
import Animation from '../../components/Animation.js'

// a simple entity that flies back and forth while fluttering up and down
// and does not collide with anything or affect gameplay in any way
export default class Insect {
  constructor (config) {
    Object.assign(this, config)
    this.animations = {}
    this.currentAnimation = null
    this.age = 0
    this.spawnX = Math.random() * 4096
    this.spawnY = Math.random() * 4096
    this.wobbleSpeed = 1024
    this.wobbleWidth = 256
    this.wobbleHeight = 32
    this.flutterSpeed = 512
    this.flutterHeight = 16
  }

  init () {
    this.buildAnimations()
    this.currentAnimation = this.getAnimation()
    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
  }

  buildAnimations () {
    // override this method in subclasses
  }

  getAnimation () {
    // override this method in subclasses
  }

  update (deltaTime) {

    this.age += deltaTime
    
    // move in a large slow oval back and forth
    this.x = this.spawnX + Math.cos(age / this.wobbleSpeed) * this.wobbleWidth;
    this.y = this.spawnX + Math.sin(age / this.wobbleSpeed) * this.wobbleHeight;

    // tiny fast wobble up and down
    this.y += Math.cos(age / this.flutterSpeed) * this.flutterHeight;

    // flap your wings
    this.currentAnimation?.update(deltaTime)
  }

  draw (camera) {
    this.currentAnimation?.draw(this.x, this.y, camera)
  }

  drawAsInventory (x, y, width, height) {
    // TODO: implement the ability to catch butterflies! =)
    const frame = this.animations['Inventory'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}