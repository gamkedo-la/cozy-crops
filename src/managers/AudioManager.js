import Sounds from '../globals/Sounds.js'

export default class AudioManager {
  constructor (config) {
    this.sounds = {}
  }
  
  async load () {
    const soundPromises = Object.keys(Sounds).map(async key => {
      const sound = new Audio()
      sound.src = Sounds[key]
      await new Promise(resolve => {
        sound.oncanplaythrough = resolve
      })
      this.sounds[key] = sound
    })

    await Promise.all(soundPromises)
  }
}