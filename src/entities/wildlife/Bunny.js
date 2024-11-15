import Animal from './Animal.js'
import { BunnyAnimationData } from '../../globals/WildlifeAnimations.js'

export default class Bunny extends Animal {

  init() {
    this.facingLeft = Math.random() > 0.5
    this.buildAnimations(BunnyAnimationData)
    this.currentAnimation = this.getAnimation(this.facingLeft ? 'IdleLeft' : 'IdleRight')

    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height

    this.collisionPoint = { x: this.x + this.width / 2, y: this.y + this.height }
  }

  update(deltaTime) {
    this.age += deltaTime
    // slowly go back and forth
    // this.x = this.spawnX + Math.cos(this.age/1000000 * this.wobbleSpeed) * this.wobbleWidth;
    // slowly go up and down
    // this.y = this.spawnY + Math.sin(this.age/1000000 * this.wobbleSpeed) * this.wobbleHeight;
    // mix in a fast wobble up and down (flutter)
    // this.y += Math.cos(this.age/1000000 * this.flutterSpeed) * this.flutterHeight;
    // snap to crisp pixels
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    // update sprite
    this.currentAnimation?.update(deltaTime)
  }

}