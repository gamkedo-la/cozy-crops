// the weather

// usage examples:
// weather.getFoggy()
// weather.startRaining()

import { CanvasHeight, CanvasWidth } from "../../globals/Constants.js"

// WARNING: silent death (no errors!) when there's a bug here:
import { R, F, C, S, W } from '../../globals/Keys.js'
import { CheatKeys } from '../../globals/Debug.js'

// FIXME: how the heck do you load an image in this project?!?!?!
// this took me waaaaaay too long to figure out and it's still wrong
// this.game.ctx.drawImage(this.scene.managers.imageManager.getImage(RainSprite),100,100)
// I GAVE UP and wrote my own image loader in 3 minutes

// import { RainSprite } from '../../globals/Images.js'
// import { SnowSprite } from '../../globals/Images.js'

export default class Weather {
  
  constructor (config) {
    Object.assign(this, config)
    this.age = 0
    this.FADESPEED = 0.15
    this.coolBlueStrength = 0
    this.coolBlueFadeDelta = 0
    this.fogStrength = 0
    this.fogFadeDelta = 0
    this.rainStrength = 0
    this.rainFadeDelta = 0
    this.snowStrength = 0
    this.snowFadeDelta = 0
    this.windStrength = 0
    this.windFadeDelta = 0
  }

  init () {
    console.log("weather system is initializing")
    
    // for debug purposes, start every game with a foggy day with rain and wind!
    // this.getWindy()
    // this.startRaining()
    // this.getFoggy()
    // ^--- not needed anymore: we use cheat keys R,F,C to trigger weather
        
  }

  startRaining() {
    console.log("weather system: rain begins")
    this.rainFadeDelta = this.FADESPEED
  }

  stopRaining() {
    console.log("weather system: rain ends")
    this.rainFadeDelta = -this.FADESPEED
  }

  startSnowing() {
    console.log("weather system: snow begins")
    this.snowFadeDelta = this.FADESPEED
  }

  stopSnowing() {
    console.log("weather system: snow ends")
    this.snowFadeDelta = -this.FADESPEED
  }

  getFoggy() {
    console.log("weather system: fog begins")
    this.fogFadeDelta = this.FADESPEED
  }

  clearFog() {
    console.log("weather system: fog fading out")
    this.fogFadeDelta = -this.FADESPEED
  }

  getCool() {
    console.log("weather system: cool blue tint begins")
    this.coolBlueFadeDelta = this.FADESPEED
  }

  getWarm() {
    console.log("weather system: cool blue tint fading out")
    this.coolBlueFadeDelta = -this.FADESPEED
  }

  getWindy() {
    console.log("weather system: wind picks up")
    this.windFadeDelta = this.FADESPEED
  }

  stopWind() {
    console.log("weather system: wind stops")
    this.windFadeDelta = -this.FADESPEED
  }

  update (deltaTime) {
    this.age += deltaTime
    ///console.log("weather update - age: "+this.age.toFixed(1))

    if (CheatKeys) {
        const justDownKeys = this.scene.inputManager.getJustDownKeys()
        if (justDownKeys.includes(F)) this.getFoggy()
        if (justDownKeys.includes(C)) this.getCool()
        if (justDownKeys.includes(R)) this.startRaining()
        // FIXME - does this interfere with multiplayer WASD?
        if (justDownKeys.includes(S)) this.startSnowing()
        if (justDownKeys.includes(W)) this.getWindy()
    }

    this.coolBlueStrength += (deltaTime/1000) * this.coolBlueFadeDelta
    this.fogStrength += (deltaTime/1000) * this.fogFadeDelta
    this.rainStrength += (deltaTime/1000) * this.rainFadeDelta
    this.snowStrength += (deltaTime/1000) * this.snowFadeDelta
    this.windStrength += (deltaTime/1000) * this.windStrengthFadeDelta

    // reverse fades when at max
    if (this.coolBlueStrength>=1) { this.coolBlueStrength=1; this.coolBlueFadeDelta *= -1 }
    if (this.fogStrength>=1) { this.fogStrength=1; this.fogFadeDelta *= -1 }
    if (this.rainStrength>=1) { this.rainStrength=1; this.rainFadeDelta *= -1 }
    if (this.snowStrength>=1) { this.snowStrength=1; this.snowFadeDelta *= -1 }
    if (this.windStrength>=1) { this.windStrength=1; this.windStrengthFadeDelta *= -1 }
    // stop fades when at min
    if (this.coolBlueStrength<=0) { this.coolBlueStrength=0; this.coolBlueFadeDelta = 0 }
    if (this.fogStrength<=0) { this.fogStrength=0; this.fogFadeDelta = 0 }
    if (this.rainStrength<=0) { this.rainStrength=0; this.rainFadeDelta = 0 }
    if (this.snowStrength<=0) { this.snowStrength=0; this.snowFadeDelta = 0 }
    if (this.windStrength<=0) { this.windStrength=0; this.windStrengthFadeDelta = 0 }
  }

  draw (camera) {
    //console.log("weather draw")

    if (this.coolBlueStrength>0) {
        let opacity = this.coolBlueStrength/3
        this.game.ctx.fillStyle = "rgba(16,32,255,"+opacity+")" 
        this.game.ctx.fillRect(0,0,CanvasWidth,CanvasHeight)
        this.game.ctx.fillStyle = "white"
    }

    if (this.fogStrength>0) {
        let opacity = this.fogStrength/2
        this.game.ctx.fillStyle = "rgba(128,128,128,"+opacity+")" 
        this.game.ctx.fillRect(0,0,CanvasWidth,CanvasHeight)
        this.game.ctx.fillStyle = "white"
    }
    
    if (this.rainStrength>0) {
 
        // TODO: use this project's ultra-complex version of image loading
        if (!this.rainImg) { 
            this.rainImg = new Image();
            this.rainImg.src = "../../img/rain.png"
            this.rainImg.onload = function() { this.loaded=true }
        }
        if (this.rainImg.loaded) {
            this.game.ctx.globalAlpha = this.rainStrength
            for (let i=0; i<16; i++) {
                let ofs = -800 + ((this.age+i*444)%2000) 
                this.game.ctx.drawImage(this.rainImg,i*222,ofs)
            }
            this.game.ctx.globalAlpha = 1
        }
    }

    if (this.snowStrength>0) {
        // TODO: use this project's ultra-complex version of image loading
        if (!this.snowImg) { 
            this.snowImg = new Image();
            this.snowImg.src = "../../img/snow.png"
            this.snowImg.onload = function() { this.loaded=true }
        }
        if (this.snowImg.loaded) {
            this.game.ctx.globalAlpha = this.snowStrength
            for (let i=0; i<16; i++) {
                let ofs = -800 + ((this.age/4+i*444)%2000) 
                let wobble = Math.sin(ofs/200)*64
                this.game.ctx.drawImage(this.snowImg,i*222+wobble,ofs)
            }
            this.game.ctx.globalAlpha = 1
        }
    }

  }

}