export default class NewGameDialog {
  constructor (config) {
    Object.assign(this, config)

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

  const container = document.createElement('div')
  container.id = 'container'
  container.style.position = 'absolute'

  const canvasRect = dialog.scene.game.canvas.getBoundingClientRect()
  const containerWidth = 400
  const containerHeight = 125
  container.style.left = `${canvasRect.left + (canvasRect.width / 2) - containerWidth / 2}px`
  container.style.top = `${canvasRect.top + (canvasRect.height / 2) - containerHeight / 2}px`
  container.style.width = `${containerWidth}px`
  container.style.height = `${containerHeight}px`

  container.style.backgroundColor = 'white'
  container.style.border = '2px solid black'
  container.style.borderRadius = '10px'
  container.style.zIndex = '99'

  document.body.appendChild(container)

  const slotName = document.createElement('input')
  slotName.type = 'text'
  slotName.id = 'slotName'
  slotName.placeholder = 'Enter the name of your farm...'
  slotName.style.position = 'absolute'
  const inputWidth = containerWidth - 20
  const inputHeight = 40
  slotName.style.left = `${canvasRect.left + (canvasRect.width / 2) - (inputWidth / 2) - 2}px`
  slotName.style.top = `${canvasRect.top + (canvasRect.height / 2) - (containerHeight / 2) + 10}px`
  slotName.style.width = `${inputWidth}px`
  slotName.style.height = `${inputHeight}px`
  slotName.style.fontSize = '16px'
  slotName.style.textAlign = 'left'
  slotName.style.border = '2px solid black'
  slotName.style.borderRadius = '5px'
  slotName.style.backgroundColor = 'white'
  slotName.style.color = 'black'
  slotName.style.zIndex = '100'
  slotName.style.display = 'block'

  const createButton = document.createElement('button')
  createButton.id = 'createButton'
  createButton.innerText = 'Create'
  createButton.style.position = 'absolute'
  const buttonWidth = 100
  const buttonHeight = 50
  createButton.style.left = `${canvasRect.left + (canvasRect.width / 2) - (2 * buttonWidth) + 10}px`
  createButton.style.top = `${canvasRect.top + (canvasRect.height / 2) + (containerHeight / 2) - (buttonHeight) - 8}px`
  createButton.style.width = `${buttonWidth}px`
  createButton.style.height = `${buttonHeight}px`
  createButton.style.fontSize = '24px'
  createButton.style.textAlign = 'center'
  createButton.style.border = '2px solid black'
  createButton.style.borderRadius = '5px'
  createButton.style.backgroundColor = 'blue'
  createButton.style.color = 'white'
  createButton.style.zIndex = '100'
  createButton.style.display = 'block'

  const cancelButton = document.createElement('button')
  cancelButton.id = 'cancelButton'
  cancelButton.innerText = 'Cancel'
  cancelButton.style.position = 'absolute'
  cancelButton.style.left = `${canvasRect.left + (canvasRect.width / 2) + (buttonWidth) - 5}px`
  cancelButton.style.top = `${canvasRect.top + (canvasRect.height / 2) + (containerHeight / 2) - (buttonHeight) - 8}px`
  cancelButton.style.width = `${buttonWidth}px`
  cancelButton.style.height = `${buttonHeight}px`
  cancelButton.style.fontSize = '24px'
  cancelButton.style.textAlign = 'center'
  cancelButton.style.border = '2px solid black'
  cancelButton.style.borderRadius = '5px'
  cancelButton.style.backgroundColor = 'red'
  cancelButton.style.color = 'white'
  cancelButton.style.zIndex = '100'
  cancelButton.style.display = 'block'

  document.body.appendChild(slotName)
  slotName.focus()
  document.body.appendChild(createButton)
  document.body.appendChild(cancelButton)

  createButton.onclick = () => {
    dialog.scene.inputManager.ignoreInput(false)
    dialog.scene.showingNewGameDialog = false

    const slotName = document.getElementById('slotName').value

    dialog.scene.managers.gameManager.saveSaveSlot(slotName)
    dialog.scene.managers.gameManager.loadGame(slotName)

    document.body.removeChild(document.getElementById('slotName'))
    document.body.removeChild(document.getElementById('createButton'))
    document.body.removeChild(document.getElementById('cancelButton'))
    document.body.removeChild(document.getElementById('container'))
    document.body.removeChild(document.getElementById('shadow'))

    dialog.scene.newGameDialogDismissed(true)
  }

  cancelButton.onclick = () => {
    dialog.scene.inputManager.ignoreInput(false)
    dialog.scene.showingNewGameDialog = false

    document.body.removeChild(document.getElementById('slotName'))
    document.body.removeChild(document.getElementById('createButton'))
    document.body.removeChild(document.getElementById('cancelButton'))
    document.body.removeChild(document.getElementById('container'))
    document.body.removeChild(document.getElementById('shadow'))

    dialog.scene.newGameDialogDismissed(false)
  }
}
