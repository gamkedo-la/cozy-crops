import { UISprites } from '../globals/Images.js'

export default class ColorButton {
  constructor (config) {
    Object.assign(this, config)

    this.element = build(this)
  }

  show () {
    this.element.style.display = 'block'
  }

  hide () {
    this.element.style.display = 'none'
  }
}

function build (button) {
  const btnCanvas = document.createElement('canvas')
  btnCanvas.width = (2 * button.imgDims.width) // - (2 * button.imgDims.padding)
  btnCanvas.height = (2 * button.imgDims.height) // - (2 * button.imgDims.padding)
  const btnCtx = btnCanvas.getContext('2d')
  btnCtx.drawImage(button.imageManager.getImageWithSrc(UISprites), button.imgDims.x, button.imgDims.y, button.imgDims.width, button.imgDims.height, 0, 0, btnCanvas.width, btnCanvas.height)
  btnCtx.fillStyle = `rgba(${button.color[0]}, ${button.color[1]}, ${button.color[2]}, ${button.color[3]})`
  // btnCtx.globalCompositeOperation = 'source-in'
  btnCtx.fillRect(btnCanvas.width / 4, btnCanvas.height / 4, button.imgDims.width, button.imgDims.height)

  const dataURL = btnCanvas.toDataURL()

  const btn = document.createElement('button')
  btn.id = button.id
  btn.style.position = 'absolute'
  const buttonWidth = btnCanvas.width
  const buttonHeight = btnCanvas.height
  btn.style.top = button.top
  btn.style.left = button.left
  btn.style.width = `${buttonWidth - 2}px`
  btn.style.height = `${buttonHeight - 2}px`
  btn.style.textAlign = 'center'
  btn.style.borderRadius = '2px'
  btn.style.backgroundImage = `url(${dataURL})`
  btn.style.backgroundPosition = `-${2 * button.imgDims.padding}px -${2 * button.imgDims.padding}px`
  btn.style.backgroundSize = `${(btnCanvas.width + 2 * button.imgDims.padding)}px ${(btnCanvas.height + 2 * button.imgDims.padding)}px`
  btn.style.border = 'none'
  btn.style.outline = 'none'
  btn.style.color = 'white'
  btn.style.zIndex = '100'
  btn.style.display = 'block'

  btn.onclick = button.onClick

  //  add a dropshadow effect when the button is hovered over or focused
  btn.onmouseover = () => {
    btn.style.boxShadow = '0px 0px 5px 2px rgba(0, 0, 0, 0.5)'
  }
  btn.onmouseout = () => {
    btn.style.boxShadow = 'none'
  }
  btn.onfocus = () => {
    btn.style.boxShadow = '0px 0px 5px 2px rgba(0, 0, 0, 0.5)'
  }
  btn.onblur = () => {
    btn.style.boxShadow = 'none'
  }

  return btn
}