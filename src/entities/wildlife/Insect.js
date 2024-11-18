// TODO: refactor to use Animal class

import ButterflyAnimations from '../../globals/WildlifeAnimations.js'
import Animation from '../../components/Animation.js'

// a simple entity that flies back and forth while fluttering up and down
// and does not collide with anything or affect gameplay in any way
export default class Insect {
  constructor (config) {
    Object.assign(this, config)
    this.animations = {}
    this.currentAnimation = null
    // age = sine wave phase so they don't all start going the same direction
    this.age = Math.random() * 1000000 
    this.spawnX = config.x, //Math.random() * 4096
    this.spawnY = config.y, //Math.random() * 4096
    this.wobbleSpeed = 64 + Math.random()*160
    this.wobbleWidth = 64 + Math.random()*256
    this.wobbleHeight = 8 + Math.random()*32
    this.flutterSpeed = 2048 + Math.random()*2048
    this.flutterHeight = 2 + Math.random()*4
    this.width = 1
    this.height = 1
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

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  update (deltaTime) {
    this.age += deltaTime
    // tiny fast wobble up and down
    this.y += Math.cos(this.age/1000000 * this.flutterSpeed) * this.flutterHeight;
    // move in a large slow oval back and forth
    this.x = this.spawnX + Math.cos(this.age/1000000 * this.wobbleSpeed) * this.wobbleWidth;
    this.y = this.spawnY + Math.sin(this.age/1000000 * this.wobbleSpeed) * this.wobbleHeight;
    // face left or right depending on movement direction
    this.nextX = this.x
    this.currentAnimation = this.getAnimation(this.prevX>=this.nextX?'flyLeft':'flyRight')    
    this.prevX = this.x
    // snap to crisp pixels - this inerferes with the directionality detection, hence the prev* vars above
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    // flap your wings
    this.currentAnimation?.update(deltaTime)
    //console.log("debug: player pos: "+this.scene.steve.x+","+this.scene.steve.y);
  }

  draw (camera) {
    if (this.currentAnimation) {
        
        this.currentAnimation.draw(this.x, this.y, camera) 
        
    } else {
        console.log("error: missing animation for an insect at "+this.x+","+this.y)
    }
  }

  drawAsInventory (x, y, width, height) {
    // TODO: implement the ability to catch butterflies! =)
    const frame = this.animations['Inventory'].getCurrentFrame()
    this.game.ctx.drawImage(this.currentAnimation.spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height)
  }
}