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

  isMusicPlaying (src) {
    return !this.getSoundWithSrc(src).paused
  }

  startMusic (src) {
    this.play(this.getSoundWithSrc(src))
  }

  pauseMusic (src) {
    this.pause(this.getSoundWithSrc(src))
  }

  duckMusic (src) {
    this.getSoundWithSrc(src).volume = 0.1
  }

  unDuckMusic (src) {
    this.getSoundWithSrc(src).volume = 1
  }

  loopMusic (src) {
    this.getSoundWithSrc(src).loop = true
  }

  setMusicVolume (src,vol) {
    this.getSoundWithSrc(src).volume = vol
  }

  muteMusic (src) {
    this.getSoundWithSrc(src).volume = 0
  }

  unMuteMusic (src) {
    this.getSoundWithSrc(src).volume = 1
  }

  play (sound,volume) {
    if (volume!=undefined) sound.volume=volume
    sound.play()
  }

  // useful when audio should continue across scenes (probably just the background music)
  playSource (src,volume) {
    this.play(this.getSoundWithSrc(src),volume)
  }

  // useful when audio should continue across scenes (probably just the background music)
  pause (sound) {
    sound.pause()
  }

  // useful when audio should continue across scenes (probably just the background music)
  pauseSource (src) {
    this.pause(this.getSoundWithSrc(src))
  }

  // fade from one music track to another
  fadeMusic(fromSrc, toSrc, duration = 500) { 
    const fromMusic = this.getSoundWithSrc(fromSrc);
    const toMusic = this.getSoundWithSrc(toSrc);

    // Ensure the new music starts playing at 0 volume
    toMusic.volume = 0;
    toMusic.play();
    
    const fadeSteps = 30; // Number of steps in fade
    let stepDuration = duration / fadeSteps;
    
    let step = 0;

    const fadeInterval = setInterval(() => {
        step++;
        let progress = step / fadeSteps;
        
        // Gradually reduce volume of current music
        fromMusic.volume = Math.max(0, 1 - progress);
        // Gradually increase volume of new music
        toMusic.volume = Math.min(1, progress);

        if (progress >= 1) {
            clearInterval(fadeInterval);
            fromMusic.pause(); // Pause the old music after fade completes
            fromMusic.currentTime = 0; // Reset to start in case played later
        }
    }, stepDuration);
}
}