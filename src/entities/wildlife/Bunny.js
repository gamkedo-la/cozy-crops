import Animal from './Animal.js'
import { BunnyAnimationData } from '../../globals/WildlifeAnimations.js'

export default class Bunny extends Animal {

  init() {
    this.facingLeft = Math.random() > 0.5
    this.buildAnimations(BunnyAnimationData)
    this.currentAnimation = this.getAnimation(this.facingLeft ? 'IdleLeft' : 'IdleRight')
    this.hopFramesLeft = 20 // start with a hop!
    this.width = this.currentAnimation.width
    this.height = this.currentAnimation.height
    // FIXME: this looks off: nudge more to the left???
    this.collisionPoint = { x: (this.x + this.width / 2) + 8, y: this.y + this.height }
  }

  update(deltaTime) {
    this.age += deltaTime
    // occasionally hop
    if (this.hopFramesLeft<=0 && Math.random()<0.002) {
        //console.log("a bunny decides to hop")
        this.hopFramesLeft = 20
    }
    // animate the hop
    if (this.hopFramesLeft>0) {
        this.hopFramesLeft--
        if (this.hopFramesLeft>=10) this.y--; else this.y++
        // avoid jumping into the water or a wall
        if (!this.scene.playerCanWalk({x:this.x+(this.facingLeft?-1:1),y:this.y})) {
            console.log("bunny hit a wall: turning around")
            this.facingLeft = !this.facingLeft
            this.currentAnimation = this.getAnimation(this.facingLeft ? 'IdleLeft' : 'IdleRight')
        }
        if (this.facingLeft) this.x--; else this.x++
    }
    // occasionally switch directions
    if (Math.random()<0.0005) {
        //console.log("a bunny decides to turn around")
        this.facingLeft = !this.facingLeft
        this.currentAnimation = this.getAnimation(this.facingLeft ? 'IdleLeft' : 'IdleRight')
    }
    // snap to crisp pixels
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    // update sprite
    this.currentAnimation?.update(deltaTime)
  }

}