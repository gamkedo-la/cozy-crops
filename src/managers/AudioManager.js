import Events from '../globals/Events.js'
import Sounds from '../globals/Sounds.js'

export default class AudioManager {
  constructor (config) {
    Object.assign(this, config)

    this.sounds = {}
    this.srcToKeyMap = {}
    this.loadedCount = 0
    this.totalCount = Object.keys(Sounds).length
  }
  
  async load () {
    if (this.totalCount === 0) {
      this.eventManager.emit(Events.AllAudioLoaded)
      return
    }

    const soundPromises = Object.keys(Sounds).map(async key => {
      const sound = new Audio()
      sound.src = Sounds[key]
      this.srcToKeyMap[Sounds[key]] = key
      await new Promise(resolve => {
        this.eventManager.emit(Events.AudioLoaded)
        this.loadedCount++
        sound.oncanplaythrough = resolve
      })
      this.sounds[key] = sound
    })

    await Promise.all(soundPromises)

    this.eventManager.emit(Events.AllAudioLoaded)
  }

  getSoundWithSrc (src) {
    return this.sounds[this.srcToKeyMap[src]]
  }
}