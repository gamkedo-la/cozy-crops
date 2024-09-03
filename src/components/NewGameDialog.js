import ImageButton from '../uiElements/ImageButton.js'
import { ConfirmButton, CancelButton } from '../globals/UISpriteData.js'
import UIAttributes from '../globals/UIAttributes.js'

export default class NewGameDialog {
  constructor (config) {
    Object.assign(this, config)

    this.elements = []
    build (this)
  }
}

function build (dialog) {
  dialog.scene.inputManager.ignoreInput(true)
  dialog.scene.showingNewGameDialog = true

  const shadow = document.createElement('div')
  shadow.id = 'shadow'
  shadow.style.position = 'absolute'
  shadow.style.left = '0px'
  shadow.style.top = '0px'
  shadow.style.width = '100%'
  shadow.style.height = '100%'
  shadow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  shadow.style.zIndex = '50'

  document.body.appendChild(shadow)
  dialog.elements.push(shadow)

  const container = document.createElement('div')
  container.id = 'container'
  container.style.position = 'absolute'

  const canvasRect = dialog.scene.game.canvas.getBoundingClientRect()
  const containerWidth = 400
  const containerHeight = 155
  container.style.left = `${canvasRect.left + (canvasRect.width / 2) - containerWidth / 2}px`
  container.style.top = `${canvasRect.top + (canvasRect.height / 2) - (containerHeight / 2) - 20}px`
  container.style.width = `${containerWidth}px`
  container.style.height = `${containerHeight}px`

  container.style.backgroundColor = 'white'
  container.style.border = '2px solid black'
  container.style.borderRadius = '10px'
  container.style.zIndex = '99'

  document.body.appendChild(container)
  dialog.elements.push(container)

  const title = document.createElement('h1')
  title.style.position = 'absolute'
  title.style.left = `${canvasRect.left + (canvasRect.width / 2) - 105}px`
  title.style.top = `${canvasRect.top + (canvasRect.height / 2) - containerHeight / 2 - 35}px`
  title.style.textAlign = 'center'
  title.style.zIndex = '101'
  title.style.color = 'black'
  title.style.fontFamily = UIAttributes.UIFontFamily
  title.style.display = 'block'
  title.innerHTML = 'Create New Game'

  document.body.appendChild(title)
  dialog.elements.push(title)

  const slotName = document.createElement('input')
  slotName.type = 'text'
  slotName.id = 'slotName'
  slotName.placeholder = 'Enter the name of your farm...'
  slotName.style.position = 'absolute'
  const inputWidth = containerWidth - 20
  const inputHeight = 40
  slotName.style.left = `${canvasRect.left + (canvasRect.width / 2) - (inputWidth / 2) - 2}px`
  slotName.style.top = `${canvasRect.top + (canvasRect.height / 2) - (containerHeight / 2) + 30}px`
  slotName.style.width = `${inputWidth}px`
  slotName.style.height = `${inputHeight}px`
  slotName.style.fontSize = '20px'
  slotName.style.textAlign = UIAttributes.LeftAlign
  slotName.style.fontFamily = UIAttributes.UIFontFamily
  slotName.style.border = '2px solid black'
  slotName.style.borderRadius = '2px'
  slotName.style.backgroundColor = 'white'
  slotName.style.color = 'black'
  slotName.style.zIndex = '100'
  slotName.style.display = 'block'
  slotName.setAttribute('maxlength', 20)
  slotName.setAttribute('tabindex', 1)

  const createButton = new ImageButton({
    imageManager: dialog.scene.managers.imageManager,
    id: 'createButton',
    top: '456px', // hard-coded value to place where desired
    left: '562px', // hard-coded value to place where desired
    imgDims: ConfirmButton,
    onClick: () => {
      dialog.scene.inputManager.ignoreInput(false)
      dialog.scene.showingNewGameDialog = false

      const slotName = document.getElementById('slotName').value

      dialog.scene.managers.gameManager.saveSaveSlot(slotName)
      dialog.scene.managers.gameManager.loadGame(slotName)

      dialog.elements.forEach(element => {
        document.body.removeChild(element)
      })

      dialog.scene.newGameDialogDismissed(true)
    }
  })
  createButton.element.setAttribute('tabindex', 2)

  const cancelButton = new ImageButton({
    imageManager: dialog.scene.managers.imageManager,
    id: 'cancelButton',
    top: '456px', // hard-coded value to place where desired
    left: '835px', // hard-coded value to place where desired
    imgDims: CancelButton,
    onClick: () => {
      dialog.scene.inputManager.ignoreInput(false)
      dialog.scene.showingNewGameDialog = false

      dialog.elements.forEach(element => {
        document.body.removeChild(element)
      })


      dialog.scene.newGameDialogDismissed(false)
    }
  })
  cancelButton.element.setAttribute('tabindex', 3)

  document.body.appendChild(slotName)
  dialog.elements.push(slotName)
  slotName.focus()
  document.body.appendChild(createButton.element)
  dialog.elements.push(createButton.element)
  document.body.appendChild(cancelButton.element)
  dialog.elements.push(cancelButton.element)
}
