import ButterflyAnimations from '../../globals/WildlifeAnimations.js'
import Animation from '../../components/Animation.js'

// a simple entity that flies back and forth while fluttering up and down
// and does not collide with anything or affect gameplay in any way
export default class Insect {
  constructor (config) {
    Object.assign(this, config)
    this.animations = {}
    this.currentAnimation = null
    this.age = 0
    this.spawnX = config.x, //Math.random() * 4096
    this.spawnY = config.y, //Math.random() * 4096
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
    this.x = this.spawnX + Math.cos(this.age / this.wobbleSpeed) * this.wobbleWidth;
    this.y = this.spawnX + Math.sin(this.age / this.wobbleSpeed) * this.wobbleHeight;

    // tiny fast wobble up and down
    this.y += Math.cos(this.age / this.flutterSpeed) * this.flutterHeight;

    // flap your wings
    this.currentAnimation?.update(deltaTime)

    //console.log("debug: player pos: "+this.scene.steve.x+","+this.scene.steve.y);
  }

  draw (camera) {
    if (this.currentAnimation) {
        
        // FIXME: nothing seems to get rendered?
        this.currentAnimation.draw(this.x, this.y, camera) 
        
        // debug check:
        // result: nothing is drawn!?!?!?!
        // ok maybe the image/canvas is blank or something.... =(
        // this.game.ctx.drawImage(this.currentAnimation.spritesheet,this.scene.steve.x,this.scene.steve.y-20)
        // nothing
        // what am I doing wrong?
        //this.game.ctx.fillStyle = "red"
        //this.game.ctx.fillRect(this.scene.steve.x,this.scene.steve.y-20,200,200)
        // still nothing!
        //this.game.ctx.fillRect(0,0,10000,10000) // hmm still nothing.. 

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