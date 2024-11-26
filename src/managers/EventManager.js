export default class EventManager {
  constructor (config) {
    Object.assign(this, config)

    this.events = {}
  }

  on (eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = []

    this.events[eventName].push(callback)
  }

  off (eventName, callback) {
    if (!this.events[eventName]) return

    this.events[eventName] = this.events[eventName].filter(eventCallback => {
      return eventCallback !== callback
    })
  }

  emit (eventName, ...args) {
    if (!this.events[eventName]) return

    this.events[eventName].forEach(callback => {
      callback(...args)
    })

    // Special handling for pause events
    if (eventName === 'gameStateChanged' && args[0] && args[0].isPaused !== undefined) {
      // Pause/unpause game logic (e.g., stopping animations, music, etc.)
      if (args[0].isPaused) {
        // Pause game systems
      } else {
        // Resume game systems
      }
    }
  }
}
