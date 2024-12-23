// the weather

// example:
// weather.startRaining()
// weather.stopRaining()

import { CanvasHeight, CanvasWidth } from "../../globals/Constants.js"
import { R, F, C, V, G } from '../../globals/Keys.js'
import { CheatKeys } from '../../globals/Debug.js'
import { RainSprite, SnowSprite } from "../../globals/Images.js"
import { RainSound, WindSound } from "../../globals/Sounds.js"

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
    this.rainImg = null
    this.snowImg = null
    this.windSound = null
    this.rainSound = null
    this.currentWeather = null
  }

  init () {
    this.rainImg = this.imageManager.getImageWithSrc(RainSprite)

    this.rainSound = this.audioManager.getSoundWithSrc(RainSound)
    this.rainSound.volume = 0
    this.rainSound.loop = true

    this.windSound = this.audioManager.getSoundWithSrc(WindSound)
    this.windSound.volume = 0
    this.windSound.loop = true

    this.snowImg = this.imageManager.getImageWithSrc(SnowSprite)
  }

  startRaining() {
    console.log("weather system: rain begins")
    this.rainFadeDelta = this.FADESPEED
    this.rainSound.play()
    this.stopWeather()
    this.currentWeather = 'Rain'
  }

  stopRaining() {
    console.log("weather system: rain ends")
    this.rainFadeDelta = -this.FADESPEED
    if (this.currentWeather === 'Rain') this.currentWeather = null
  }

  startSnowing() {
    console.log("weather system: snow begins")
    this.snowFadeDelta = this.FADESPEED
    this.stopWeather()
    this.currentWeather = 'Snow'
  }

  stopSnowing() {
    console.log("weather system: snow ends")
    this.snowFadeDelta = -this.FADESPEED
    if (this.currentWeather === 'Snow') this.currentWeather = null
  }

  getFoggy() {
    console.log("weather system: fog begins")
    this.fogFadeDelta = this.FADESPEED
    this.stopWeather()
    this.currentWeather = 'Fog'
  }

  clearFog() {
    console.log("weather system: fog fading out")
    this.fogFadeDelta = -this.FADESPEED
    if (this.currentWeather === 'Fog') this.currentWeather = null
  }

  getCool() {
    console.log("weather system: cool blue tint begins")
    this.coolBlueFadeDelta = this.FADESPEED
    this.stopWeather()
    this.currentWeather = 'Cool'
  }

  getWarm() {
    console.log("weather system: cool blue tint fading out")
    this.coolBlueFadeDelta = -this.FADESPEED
    if (this.currentWeather === 'Cool') this.currentWeather = null
  }

  getWindy() {
    console.log("weather system: wind picks up")
    this.windFadeDelta = this.FADESPEED
    this.windSound.play()
    this.stopWeather()
    this.currentWeather = 'Wind'
  }

  stopWind() {
    console.log("weather system: wind stops")
    this.windFadeDelta = -this.FADESPEED
    if (this.currentWeather === 'Wind') this.currentWeather = null
  }

  stopWeather() {
    switch (this.currentWeather) {
      case 'Rain':
        this.stopRaining()
        break
      case 'Snow':
        this.stopSnowing()
        break
      case 'Fog':
        this.clearFog()
        break
      case 'Cool':
        this.getWarm()
        break
      case 'Wind':
        this.stopWind()
        break
    }
  }

  update (deltaTime) {
    this.age += deltaTime
    /*
    console.log("weather update:"+
        " age:"+this.age.toFixed(0)+
        " fog:"+this.fogStrength.toFixed(1)+ 
        " cool:"+this.coolBlueStrength.toFixed(1)+ 
        " rain:"+this.rainStrength.toFixed(1)+ 
        " snow:"+this.snowStrength.toFixed(1)+ 
        " wind:"+this.windStrength.toFixed(1))
    */
    if (CheatKeys) {
        const justDownKeys = this.scene.inputManager.getJustDownKeys()
        if (justDownKeys.includes(F)) { !this.fogStrength ? this.getFoggy() : this.clearFog() }
        if (justDownKeys.includes(C)) { !this.coolBlueStrength ? this.getCool() : this.getWarm() }
        if (justDownKeys.includes(R)) { !this.rainStrength ? this.startRaining() : this.stopRaining() }
        if (justDownKeys.includes(V)) { !this.snowStrength ? this.startSnowing() : this.stopSnowing() }
        if (justDownKeys.includes(G)) { !this.windStrength ? this.getWindy() : this.stopWind() }
    }

    this.coolBlueStrength += (deltaTime / 1000) * this.coolBlueFadeDelta
    this.fogStrength += (deltaTime / 1000) * this.fogFadeDelta
    this.rainStrength += (deltaTime / 1000) * this.rainFadeDelta
    this.snowStrength += (deltaTime / 1000) * this.snowFadeDelta
    this.windStrength += (deltaTime / 1000) * this.windFadeDelta

    if (this.coolBlueStrength > 1) this.coolBlueStrength = 1
    if (this.fogStrength > 1) this.fogStrength = 1
    if (this.rainStrength > 1) this.rainStrength = 1
    if (this.snowStrength > 1) this.snowStrength = 1
    if (this.windStrength > 1) this.windStrength = 1

    if (this.coolBlueStrength < 0) this.coolBlueStrength = 0
    if (this.fogStrength < 0) this.fogStrength = 0
    if (this.rainStrength < 0) this.rainStrength = 0
    if (this.snowStrength < 0) this.snowStrength = 0
    if (this.windStrength < 0) this.windStrength = 0

    this.windSound.volume = this.windStrength > 0 ? this.windStrength / 3 : 0
    if (this.windSound.volume === 0) this.windSound.pause()

      this.rainSound.volume = this.rainStrength > 0 ? this.rainStrength / 3 : 0
    if (this.rainSound.volume === 0) this.rainSound.pause()
  }

  draw () {
    if (this.coolBlueStrength > 0) {
        let opacity = this.coolBlueStrength/3
        this.game.ctx.fillStyle = "rgba(16,32,255,"+opacity+")" 
        this.game.ctx.fillRect(0, 0, CanvasWidth, CanvasHeight)
        this.game.ctx.fillStyle = "white"
    }
    if (this.fogStrength > 0) {
        let opacity = this.fogStrength / 2
        this.game.ctx.fillStyle = "rgba(128,128,128,"+opacity+")" 
        this.game.ctx.fillRect(0, 0, CanvasWidth, CanvasHeight)
        this.game.ctx.fillStyle = "white"
    }
    if (this.rainStrength > 0) {
        this.game.ctx.globalAlpha = this.rainStrength
        for (let i = 0; i < 16; i++) {
            let ofs = -800 + ((this.age + i * 444) % 2000) 
            this.game.ctx.drawImage(this.rainImg, i * 222, ofs)
        }
        this.game.ctx.globalAlpha = 1
    }
    if (this.snowStrength > 0) {
        this.game.ctx.globalAlpha = this.snowStrength
        for (let i = 0; i < 16; i++) {
            let ofs = -800 + ((this.age / 4 + i * 444) % 2000) 
            let wobble = Math.sin(ofs / 200) * 64
            this.game.ctx.drawImage(this.snowImg, i * 222 + wobble, ofs)
        }
        this.game.ctx.globalAlpha = 1
    }
  }

}