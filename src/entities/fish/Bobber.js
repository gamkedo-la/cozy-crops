import FishingUIData from '../../globals/FishingUIData.js'
import EntityTypes from '../../globals/EntityTypes.js'
import { fishWaitSound, fishSplashSound1, fishSplashSound2, fishSplashSound3 } from '../../globals/Sounds.js'

export default class Bobber {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    this.animationTime = 0
    this.animationFrameTime = 500
    this.isUp = false
    this.showWater = false
  }

  init () {
    this.animations['Bobber'] = FishingUIData['Bobber']
    this.animations['Bobber'].canvas = this.imageManager.getImageWithSrc(this.animations['Bobber'].spritesheet)
    this.animations['BobberWater'] = FishingUIData['BobberWater']
    this.animations['BobberWater'].canvas = this.imageManager.getImageWithSrc(this.animations['BobberWater'].spritesheet)
  }

  showWaterAnimation (value) {
    this.showWater = value
  }

  update (deltaTime) {
    this.animationTime += deltaTime
    if (this.animationTime >= this.animationFrameTime) {
      this.animationTime = 0
      this.y = this.isUp ? this.y - 1 : this.y + 1
      this.isUp = !this.isUp
    }

    let r = Math.random() // very occasionally play a splashing sound
    if (r<0.005) this.scene.audioManager?.playSource(fishSplashSound1,1)
    else if (r<0.01) this.scene.audioManager?.playSource(fishSplashSound2,1)
    else if (r<0.015) this.scene.audioManager?.playSource(fishSplashSound3,1)
    else if (r<0.03) this.scene.audioManager?.playSource(fishWaitSound,1) // more often

  }

  drawFishingLine() {
    let offset = this.imageManager.camera.getTopLeft()
    let startX = this.scene.steve.collisionPoint.x - offset.x - 8 
    let startY = this.scene.steve.collisionPoint.y - offset.y - 28
    let endX = this.x - offset.x + 6
    let endY = this.y - offset.y + 1
    //console.log("drawing fishing line from "+startX+","+startY+" to  "+endX+","+endY)
    let ctx = this.imageManager.internalCtx
    ctx.strokeStyle = "rgba(200,200,255,0.5)" // transparent light blue
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startX,startY)
    ctx.bezierCurveTo(startX,startY,startX-4,startY+30,endX,endY) // curvy
    //ctx.lineTo(endX,endY) // straight
    ctx.stroke()
  }

  draw (camera) {
    this.drawFishingLine()
    if (this.showWater) {
      const imageX = this.animations['BobberWater'].x
      const imageY = this.animations['BobberWater'].y
      this.imageManager.draw(this.animations['BobberWater'].canvas, this.x, this.y, this.animations['BobberWater'].width, this.animations['BobberWater'].height, imageX, imageY, camera, false)
    } else {
      const imageX = this.animations['Bobber'].x
      const imageY = this.animations['Bobber'].y
      this.imageManager.draw(this.animations['Bobber'].canvas, this.x, this.y, this.animations['Bobber'].width, this.animations['Bobber'].height, imageX, imageY, camera, false)  
    }
  }
}