import { UISprites } from '../globals/Images.js'

export default class ImageButton {
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
  btnCanvas.width = 2 * button.imgDims.width
  btnCanvas.height = 2 * button.imgDims.height
  const btnCtx = btnCanvas.getContext('2d')
  btnCtx.drawImage(button.imageManager.getImageWithSrc(UISprites), button.imgDims.x, button.imgDims.y, button.imgDims.width, button.imgDims.height, 0, 0, button.imgDims.width, button.imgDims.height)
  const dataURL = btnCanvas.toDataURL()

  const btn = document.createElement('button')
  btn.id = button.id
  btn.style.position = 'absolute'
  const buttonWidth = 2 * button.imgDims.width
  const buttonHeight = 2 * (button.imgDims.height - 3 * button.imgDims.padding)
  btn.style.top = button.top
  btn.style.left = button.left
  btn.style.width = `${buttonWidth}px`
  btn.style.height = `${buttonHeight}px`
  btn.style.textAlign = 'center'
  btn.style.borderRadius = '2px'
  btn.style.backgroundImage = `url(${dataURL})`
  btn.style.backgroundPosition = `-${2 * button.imgDims.padding}px -${2 * button.imgDims.padding}px` // '{0px 0px}' // 
  btn.style.backgroundSize = `${2 * (btnCanvas.width + 4 * button.imgDims.padding)}px ${2 * (btnCanvas.height - 2 * button.imgDims.padding)}px` // `{${btnCanvas.width}px ${btnCanvas.height}px}` // 
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