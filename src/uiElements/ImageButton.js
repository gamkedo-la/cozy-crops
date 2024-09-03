import { UISprites } from '../globals/Images.js'

export default class ConfirmButton {
  constructor (config) {
    Object.assign(this, config)

    this.element = build(this)
  }
}

function build (button) {
  const btnCanvas = document.createElement('canvas')
  btnCanvas.width = 2 * button.imgDims.width - 4
  btnCanvas.height = 2 * button.imgDims.height + 2
  const btnCtx = btnCanvas.getContext('2d')
  btnCtx.drawImage(button.imageManager.getImageWithSrc(UISprites), button.imgDims.x, button.imgDims.y, 2 * button.imgDims.width, 2 * button.imgDims.height, 0, 0, 2 * button.imgDims.width, 2 * button.imgDims.height)
  const dataURL = btnCanvas.toDataURL()

  const createButton = document.createElement('button')
  createButton.id = button.id
  createButton.style.position = 'absolute'
  const buttonWidth = 2 * button.imgDims.width
  const buttonHeight = button.imgDims.height
  createButton.style.top = button.top
  createButton.style.left = button.left
  createButton.style.width = `${buttonWidth}px`
  createButton.style.height = `${buttonHeight}px`
  createButton.style.textAlign = 'center'
  createButton.style.borderRadius = '2px'
  createButton.style.backgroundImage = `url(${dataURL})`
  createButton.style.backgroundPosition = `-${2 * button.imgDims.padding}px -${2 * button.imgDims.padding}px`
  createButton.style.backgroundSize = `${2 * (btnCanvas.width + 4 * button.imgDims.padding)}px ${2 * (btnCanvas.height - 2 * button.imgDims.padding)}px`
  createButton.style.border = 'none'
  createButton.style.outline = 'none'
  createButton.style.color = 'white'
  createButton.style.zIndex = '100'
  createButton.style.display = 'block'

  createButton.onclick = button.onClick

  //  add a dropshadow effect when the button is hovered over or focused
  createButton.onmouseover = () => {
    createButton.style.boxShadow = '0px 0px 5px 2px rgba(0, 0, 0, 0.5)'
  }
  createButton.onmouseout = () => {
    createButton.style.boxShadow = 'none'
  }
  createButton.onfocus = () => {
    createButton.style.boxShadow = '0px 0px 5px 2px rgba(0, 0, 0, 0.5)'
  }
  createButton.onblur = () => {
    createButton.style.boxShadow = 'none'
  }

  return createButton
}