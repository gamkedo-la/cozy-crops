export default class InputManager {
  constructor (config) {
    Object.assign(this, config)

    this.keys = {}
    this.mouse = {
      x: 0,
      y: 0,
      clicked: false
    }

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  handleKeyDown (event) {
    this.keys[event.key] = true
  }

  handleKeyUp (event) {
    this.keys[event.key] = false
  }

  handleMouseMove (event) {
    this.mouse.x = event.clientX
    this.mouse.y = event.clientY
  }

  handleMouseDown (event) {
    this.mouse.clicked = true
  }

  handleMouseUp (event) {
    this.mouse.clicked = false
  }

  isKeyDown (key) {
    return this.keys[key]
  }

  getDownKeys () {
    return Object.keys(this.keys).filter(key => this.keys[key])
  }

  isMouseOver (element) {
    const rect = element.getBoundingClientRect()
    return this.mouse.x >= rect.left && this.mouse.x <= rect.right && this.mouse.y >= rect.top && this.mouse.y <= rect.bottom
  }
}