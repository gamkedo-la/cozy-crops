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
  }
}