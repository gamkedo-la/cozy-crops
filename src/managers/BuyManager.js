import Keys, { F } from '../globals/Keys.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes from '../globals/EntityTypes.js'
import UISpriteData from '../globals/UISpriteData.js'
import { StoreUI } from '../globals/Images.js'
import StoreUIData from '../globals/StoreUIData.js'
import { FamilyNames } from '../globals/Fonts.js'
import BuyItemElement from '../uiElements/BuyItemElement.js'
import CropData from '../globals/CropData.js'
import TreeData from '../globals/TreeData.js'
import ToolData from '../globals/ToolData.js'
import FurnitureData from '../globals/FurnitureData.js'
import NextButton from '../uiElements/NextButton.js'
import PreviousButton from '../uiElements/PreviousButton.js'
import StoreConfirmation from '../uiElements/StoreConfirmation.js'

export default class BuyManager {
  constructor (config) {
    Object.assign(this, config)

    this.pages = []
    this.pageTitles = []

    this.currentPageIndex = 0
    this.selectedItemIndex = 0

    this.nextButton = null
    this.prevButton = null

    this.pageTitleHeight = 0

    this.shopType = null
    this.storeConfirmation = null
    this.itemContainer = null
    this.backgroundTop = null
    this.backgroundMiddle = null
    this.backgroundBottom = null
  }

  init () {
    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager
    }

    this.nextButton = new NextButton({
      ...config,
      scene: this,
      x: 0,
      y: 0
    })

    this.prevButton = new PreviousButton({
      ...config,
      scene: this,
      x: 0,
      y: 0
    })
    this.prevButton.setDisabled(true)
  }

  setShopType (shopType) {
    this.shopType = shopType

    const config = {
      game: this.game,
      scene: this.scene,
      imageManager: this.imageManager,
      entityManager: this.entityManager,
      money: this.scene.gameManager.getMoney(),
      wood: this.scene.gameManager.getWood()
    }

    switch (this.shopType) {
      case 'store':
        setStoreShopType(this, config)
        break
      case 'blacksmithshop':
        setBlacksmithShopType(this, config)
        break
      case 'carpentryshop':
        setCarpentryShopType(this, config)
        break
    }

    setButtonDisabled(this)
    positionButtons(this)
  }

  update (deltaTime, mousePos) {
    if (mousePos?.justDown) checkMouseClick(this, mousePos.x, mousePos.y)

    manageInput(this)
  }

  showNextPage () {
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex + 1) % this.pages.length
    this.selectedItemIndex = 0
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  showPreviousPage () {
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = false

    this.currentPageIndex = (this.currentPageIndex - 1 + this.pages.length) % this.pages.length
    this.selectedItemIndex = 0
    this.pages[this.currentPageIndex][this.selectedItemIndex].selected = true

    setButtonDisabled(this)
    positionButtons(this)
  }

  hideStoreConfirmation () {
    this.storeConfirmation = null
  }

  completePurchase () {
    const items = this.pages[this.currentPageIndex]
    const selectedItem = items[this.selectedItemIndex]

    if (this.shopType === 'carpentryshop') {
      if (this.storeConfirmation.quantity * selectedItem.price <= this.scene.gameManager.getWood()) {
        const woodRemoved = this.scene.gameManager.removeWood(null, selectedItem.price * this.storeConfirmation.quantity)
        // Need to remove the wood from the inventory manager too
        for (const removed of woodRemoved) {
          this.scene.inventoryManager.removeItemFromInventory({ type: removed.type }, removed.quantity)
        }
        this.scene.inventoryManager.addItemToInventory(selectedItem.getPurchasedItem(), this.storeConfirmation.quantity)
      }
    } else {
      if (this.storeConfirmation.quantity * selectedItem.price <= this.scene.gameManager.getMoney()) {
        this.scene.gameManager.setMoney(this.scene.gameManager.getMoney() - (selectedItem.price * this.storeConfirmation.quantity))
        this.scene.inventoryManager.addItemToInventory(selectedItem.getPurchasedItem(), this.storeConfirmation.quantity)
      }  
    }

    this.storeConfirmation = null
  }

  cancelPurchase () {
    this.storeConfirmation = null
  }

  draw () {
    if (this.storeConfirmation) {
      this.storeConfirmation.draw()
    } else {
      drawDialogue(this, this.dialogRect)
    }
  }
}

function drawDialogue (manager, dialogBkgdRect) {
  drawCurrentPage(manager, dialogBkgdRect)
}

function setStoreShopType (manager, config) {
  manager.pages = [
    [], // crops
    [] // trees
  ]
  manager.pageTitles = [
    'Buy Crop Seeds',
    'Buy Tree Seeds'
  ]

  manager.itemContainer = StoreUIData.StoreItem
  manager.backgroundTop = StoreUIData.StoreBackgroundTop
  manager.backgroundMiddle = StoreUIData.StoreBackgroundMiddle
  manager.backgroundBottom = StoreUIData.StoreBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeStorePage0(manager, config)
  initializeStorePage1(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function setBlacksmithShopType (manager, config) {
  manager.pages = [
    [], // base tools
    [], // upgraded tools
    [] // premium tools
  ]
  manager.pageTitles = [
    'Buy Base Tools',
    'Buy Upgraded Tools',
    'Buy Premium Tools'
  ]

  manager.itemContainer = StoreUIData.BlacksmithItem
  manager.backgroundTop = StoreUIData.BlacksmithBackgroundTop
  manager.backgroundMiddle = StoreUIData.BlacksmithBackgroundMiddle
  manager.backgroundBottom = StoreUIData.BlacksmithBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeBlacksmithPage0(manager, config)
  initializeBlacksmithPage1(manager, config)
  initializeBlacksmithPage2(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function setCarpentryShopType (manager, config) {
  manager.pages = [
    [], // Furniture
    [], // Upgraded Furniture
    [], // Wallpaper
    [] // Flooring
  ]
  manager.pageTitles = [
    'Furniture',
    'Upgraded Furniture',
    'Wallpaper',
    'Flooring'
  ]

  manager.itemContainer = StoreUIData.CarpentryItem
  manager.backgroundTop = StoreUIData.CarpentryBackgroundTop
  manager.backgroundMiddle = StoreUIData.CarpentryBackgroundMiddle
  manager.backgroundBottom = StoreUIData.CarpentryBackgroundBottom

  manager.pageTitleHeight = manager.dialogRect.top + 6 + 2 * manager.backgroundTop.height

  initializeCarpentryPage0(manager, config)
  initializeCarpentryPage1(manager, config)
  initializeCarpentryPage2(manager, config)
  initializeCarpentryPage3(manager, config)

  manager.prevButton.x = manager.game.canvas.width / 2 - manager.backgroundTop.width + 10
  manager.nextButton.x = manager.game.canvas.width / 2 + manager.backgroundTop.width - (2 * UISpriteData.NextButtonSmall.width) - 10
}

function initializeStorePage0 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'store'

  const carrot = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CarrotSeed,
    name: 'Carrot Seeds',
    price: CropData[EntityTypes.Carrot].seedPrice,
    y: currentY
  })
  carrot.init()
  manager.pages[0].push(carrot)

  currentY += deltaY

  const corn = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CornSeed,
    name: 'Corn Seeds',
    price: CropData[EntityTypes.Corn].seedPrice,
    y: currentY
  })
  corn.init()
  manager.pages[0].push(corn)

  currentY += deltaY

  const eggplant = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.EggplantSeed,
    name: 'Eggplant Seeds',
    price: CropData[EntityTypes.Eggplant].seedPrice,
    y: currentY
  })
  eggplant.init()
  manager.pages[0].push(eggplant)

  currentY += deltaY

  const lettuce = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LettuceSeed,
    name: 'Lettuce Seeds',
    price: CropData[EntityTypes.Lettuce].seedPrice,
    y: currentY
  })
  lettuce.init()
  manager.pages[0].push(lettuce)

  currentY += deltaY

  const onion = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OnionSeed,
    name: 'Onion Seeds',
    price: CropData[EntityTypes.Onion].seedPrice,
    y: currentY
  })
  onion.init()
  manager.pages[0].push(onion)

  currentY += deltaY

  const pepper = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PepperSeed,
    name: 'Pepper Seeds',
    price: CropData[EntityTypes.Pepper].seedPrice,
    y: currentY
  })
  pepper.init()
  manager.pages[0].push(pepper)

  currentY += deltaY

  const potato = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PotatoSeed,
    name: 'Potato Seeds',
    price: CropData[EntityTypes.Potato].seedPrice,
    y: currentY
  })
  potato.init()
  manager.pages[0].push(potato)

  currentY += deltaY

  const pumpkin = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PumpkinSeed,
    name: 'Pumpkin Seeds',
    price: CropData[EntityTypes.Pumpkin].seedPrice,
    y: currentY
  })
  pumpkin.init()
  manager.pages[0].push(pumpkin)

  currentY += deltaY

  const radish = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.RadishSeed,
    name: 'Radish Seeds',
    price: CropData[EntityTypes.Radish].seedPrice,
    y: currentY
  })
  radish.init()
  manager.pages[0].push(radish)

  currentY += deltaY

  const strawberry = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.StrawberrySeed,
    name: 'Strawberry Seeds',
    price: CropData[EntityTypes.Strawberry].seedPrice,
    y: currentY
  })
  strawberry.init()
  manager.pages[0].push(strawberry)

  currentY += deltaY

  const tomato = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.TomatoSeed,
    name: 'Tomato Seeds',
    price: CropData[EntityTypes.Tomato].seedPrice,
    y: currentY
  })
  tomato.init()
  manager.pages[0].push(tomato)

  currentY += deltaY

  const watermelon = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WatermelonSeed,
    name: 'Watermelon Seeds',
    price: CropData[EntityTypes.Watermelon].seedPrice,
    y: currentY
  })
  watermelon.init()
  manager.pages[0].push(watermelon)

  if (manager.currentPageIndex === 0) {
    manager.pages[0][manager.selectedItemIndex].selected = true
  }
}

function initializeStorePage1 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'store'

  const apple = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.AppleSeed,
    name: 'Apple Tree Seeds',
    price: TreeData[EntityTypes.AppleTree].seedPrice,
    y: currentY
  })
  apple.init()
  manager.pages[1].push(apple)

  currentY += deltaY

  const orange = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OrangeSeed,
    name: 'Orange Tree Seeds',
    price: TreeData[EntityTypes.OrangeTree].seedPrice,
    y: currentY
  })
  orange.init()
  manager.pages[1].push(orange)

  currentY += deltaY

  const lime = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LimeSeed,
    name: 'Lime Tree Seeds',
    price: TreeData[EntityTypes.LimeTree].seedPrice,
    y: currentY
  })
  lime.init()
  manager.pages[1].push(lime)

  currentY += deltaY

  //plum
  
  //lemon
  const cherry = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.CherrySeed,
    name: 'Cherry Tree Seeds',
    price: TreeData[EntityTypes.CherryTree].seedPrice,
    y: currentY
  })
  cherry.init()
  manager.pages[1].push(cherry)

  currentY += deltaY

  const lemon = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LemonSeed,
    name: 'Lemon Tree Seeds',
    price: TreeData[EntityTypes.LemonTree].seedPrice,
    y: currentY
  })
  lemon.init()
  manager.pages[1].push(lemon)

  currentY += deltaY

  const maple = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.MapleSeed,
    name: 'Maple Tree Seeds',
    price: TreeData[EntityTypes.MapleTree].seedPrice,
    y: currentY
  })
  maple.init()
  manager.pages[1].push(maple)

  currentY += deltaY

  const oak = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.OakSeed,
    name: 'Oak Tree Seeds',
    price: TreeData[EntityTypes.OakTree].seedPrice,
    y: currentY
  })
  oak.init()
  manager.pages[1].push(oak)

  currentY += deltaY

  const pine = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PineSeed,
    name: 'Pine Tree Seeds',
    price: TreeData[EntityTypes.PineTree].seedPrice,
    y: currentY
  })
  pine.init()
  manager.pages[1].push(pine)

  currentY += deltaY

  const plum = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.PlumSeed,
    name: 'Plum Tree Seeds',
    price: TreeData[EntityTypes.PlumTree].seedPrice,
    y: currentY
  })
  plum.init()
  manager.pages[1].push(plum)
}

function initializeBlacksmithPage0 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'blacksmithshop'

  const woodenHoe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.HoeWooden,
    name: 'Hoe',
    price: ToolData[EntityTypes.HoeWooden].price,
    y: currentY
  })
  woodenHoe.init()
  manager.pages[0].push(woodenHoe)

  currentY += deltaY

  const copperAxe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.AxeCopper,
    name: 'Axe',
    price: ToolData[EntityTypes.AxeCopper].price,
    y: currentY
  })
  copperAxe.init()
  manager.pages[0].push(copperAxe)

  currentY += deltaY

  const fishingRodBamboo = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FishingRodBamboo,
    name: 'Fishing Rod',
    price: ToolData[EntityTypes.FishingRodBamboo].price,
    y: currentY
  })
  fishingRodBamboo.init()
  manager.pages[0].push(fishingRodBamboo)

  currentY += deltaY

  const woodenShovel = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.ShovelWooden,
    name: 'Shovel',
    price: ToolData[EntityTypes.ShovelWooden].price,
    y: currentY
  })
  woodenShovel.init()
  manager.pages[0].push(woodenShovel)

  currentY += deltaY

  const woodenWateringCan = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WateringCanWooden,
    name: 'Watering Can',
    price: ToolData[EntityTypes.WateringCanWooden].price,
    y: currentY
  })
  woodenWateringCan.init()
  manager.pages[0].push(woodenWateringCan)

  if (manager.currentPageIndex === 0) {
    manager.pages[0][manager.selectedItemIndex].selected = true
  }
}

function initializeBlacksmithPage1 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'blacksmithshop'

  const copperHoe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.HoeCopper,
    name: 'Hoe',
    price: ToolData[EntityTypes.HoeCopper].price,
    y: currentY
  })
  copperHoe.init()
  manager.pages[1].push(copperHoe)
  
  currentY += deltaY

  const steelAxe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.AxeSteel,
    name: 'Axe',
    price: ToolData[EntityTypes.AxeSteel].price,
    y: currentY
  })
  steelAxe.init()
  manager.pages[1].push(steelAxe)

  currentY += deltaY

  const fishingRodFiberglass = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FishingRodFiberglass,
    name: 'Fishing Rod',
    price: ToolData[EntityTypes.FishingRodFiberglass].price,
    y: currentY
  })
  fishingRodFiberglass.init()
  manager.pages[1].push(fishingRodFiberglass)

  currentY += deltaY

  const copperShovel = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.ShovelCopper,
    name: 'Shovel',
    price: ToolData[EntityTypes.ShovelCopper].price,
    y: currentY
  })
  copperShovel.init()
  manager.pages[1].push(copperShovel)

  currentY += deltaY

  const copperWateringCan = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WateringCanCopper,
    name: 'Watering Can',
    price: ToolData[EntityTypes.WateringCanCopper].price,
    y: currentY
  })
  copperWateringCan.init()
  manager.pages[1].push(copperWateringCan)

  if (manager.currentPageIndex === 1) {
    manager.pages[1][manager.selectedItemIndex].selected = true
  }
}

function initializeBlacksmithPage2 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'blacksmithshop'

  const steelHoe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.HoeSteel,
    name: 'Hoe',
    price: ToolData[EntityTypes.HoeSteel].price,
    y: currentY
  })
  steelHoe.init()
  manager.pages[2].push(steelHoe)

  currentY += deltaY

  const titaniumAxe = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.AxeTitanium,
    name: 'Axe',
    price: ToolData[EntityTypes.AxeTitanium].price,
    y: currentY
  })
  titaniumAxe.init()
  manager.pages[2].push(titaniumAxe)

  currentY += deltaY

  const steelFishingRod = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FishingRodSteel,
    name: 'Fishing Rod',
    price: ToolData[EntityTypes.FishingRodSteel].price,
    y: currentY
  })
  steelFishingRod.init()
  manager.pages[2].push(steelFishingRod)

  currentY += deltaY

  const steelShovel = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.ShovelSteel,
    name: 'Shovel',
    price: ToolData[EntityTypes.ShovelSteel].price,
    y: currentY
  })
  steelShovel.init()
  manager.pages[2].push(steelShovel)

  currentY += deltaY

  const steelWateringCan = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WateringCanSteel,
    name: 'Watering Can',
    price: ToolData[EntityTypes.WateringCanSteel].price,
    y: currentY
  })
  steelWateringCan.init()
  manager.pages[2].push(steelWateringCan)

  if (manager.currentPageIndex === 2) {
    manager.pages[2][manager.selectedItemIndex].selected = true
  }
}

function initializeCarpentryPage0 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'carpentryshop'

  const bed = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.BedTwin,
    name: FurnitureData[EntityTypes.BedTwin].name,
    price: FurnitureData[EntityTypes.BedTwin].price,
    y: currentY
  })
  bed.init()
  manager.pages[0].push(bed)

  currentY += deltaY

  const fireplace = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FireplaceBrick,
    name: FurnitureData[EntityTypes.FireplaceBrick].name,
    price: FurnitureData[EntityTypes.FireplaceBrick].price,
    y: currentY
  })
  fireplace.init()
  manager.pages[0].push(fireplace)

  currentY += deltaY

  const lowerCabinet = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LowerCabinetBrown,
    name: FurnitureData[EntityTypes.LowerCabinetBrown].name,
    price: FurnitureData[EntityTypes.LowerCabinetBrown].price,
    y: currentY
  })
  lowerCabinet.init()
  manager.pages[0].push(lowerCabinet)

  currentY += deltaY

  const upperCabinet = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.UpperCabinetBrown,
    name: FurnitureData[EntityTypes.UpperCabinetBrown].name,
    price: FurnitureData[EntityTypes.UpperCabinetBrown].price,
    y: currentY
  })
  upperCabinet.init()
  manager.pages[0].push(upperCabinet)

  currentY += deltaY

  const fridge = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.RefrigeratorGray,
    name: FurnitureData[EntityTypes.RefrigeratorGray].name,
    price: FurnitureData[EntityTypes.RefrigeratorGray].price,
    y: currentY
  })
  fridge.init()
  manager.pages[0].push(fridge)

  currentY += deltaY

  const stove = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.StoveGray,
    name: FurnitureData[EntityTypes.StoveGray].name,
    price: FurnitureData[EntityTypes.StoveGray].price,
    y: currentY
  })
  stove.init()
  manager.pages[0].push(stove)

  if (manager.currentPageIndex === 0) {
    manager.pages[0][manager.selectedItemIndex].selected = true
  }
}

function initializeCarpentryPage1 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'carpentryshop'

  const bed = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.BedQueen,
    name: FurnitureData[EntityTypes.BedQueen].name,
    price: FurnitureData[EntityTypes.BedQueen].price,
    y: currentY
  })
  bed.init()
  manager.pages[1].push(bed)

  currentY += deltaY

  const fireplace = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FireplaceStone,
    name: FurnitureData[EntityTypes.FireplaceStone].name,
    price: FurnitureData[EntityTypes.FireplaceStone].price,
    y: currentY
  })
  fireplace.init()
  manager.pages[1].push(fireplace)

  currentY += deltaY

  const lowerCabinet = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.LowerCabinetWhite,
    name: FurnitureData[EntityTypes.LowerCabinetWhite].name,
    price: FurnitureData[EntityTypes.LowerCabinetWhite].price,
    y: currentY
  })
  lowerCabinet.init()
  manager.pages[1].push(lowerCabinet)

  currentY += deltaY

  const upperCabinet = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.UpperCabinetGray,
    name: FurnitureData[EntityTypes.UpperCabinetGray].name,
    price: FurnitureData[EntityTypes.UpperCabinetGray].price,
    y: currentY
  })
  upperCabinet.init()
  manager.pages[1].push(upperCabinet)

  currentY += deltaY

  const fridge = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.RefrigeratorSilver,
    name: FurnitureData[EntityTypes.RefrigeratorSilver].name,
    price: FurnitureData[EntityTypes.RefrigeratorSilver].price,
    y: currentY
  })
  fridge.init()
  manager.pages[1].push(fridge)

  currentY += deltaY

  const stove = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.StoveWhite,
    name: FurnitureData[EntityTypes.StoveWhite].name,
    price: FurnitureData[EntityTypes.StoveWhite].price,
    y: currentY
  })
  stove.init()
  manager.pages[1].push(stove)

  if (manager.currentPageIndex === 1) {
    manager.pages[1][manager.selectedItemIndex].selected = true
  }
}

function initializeCarpentryPage2 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'carpentryshop'

  const gray = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WallPaperGray,
    name: FurnitureData[EntityTypes.WallPaperGray].name,
    price: FurnitureData[EntityTypes.WallPaperGray].price,
    y: currentY
  })
  gray.init()
  manager.pages[2].push(gray)

  currentY += deltaY

  const red = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WallPaperAuburn,
    name: FurnitureData[EntityTypes.WallPaperAuburn].name,
    price: FurnitureData[EntityTypes.WallPaperAuburn].price,
    y: currentY
  })
  red.init()
  manager.pages[2].push(red)

  currentY += deltaY

  const striped = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WallPaperStriped,
    name: FurnitureData[EntityTypes.WallPaperStriped].name,
    price: FurnitureData[EntityTypes.WallPaperStriped].price,
    y: currentY
  })
  striped.init()
  manager.pages[2].push(striped)

  currentY += deltaY

  const tan = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.WallPaperTan,
    name: FurnitureData[EntityTypes.WallPaperTan].name,
    price: FurnitureData[EntityTypes.WallPaperTan].price,
    y: currentY
  })
  tan.init()
  manager.pages[2].push(tan)

  if (manager.currentPageIndex === 2) {
    manager.pages[2][manager.selectedItemIndex].selected = true
  }
}

function initializeCarpentryPage3 (manager, config) {
  let currentY = manager.pageTitleHeight
  const deltaY = 2 * manager.itemContainer.height

  config.shopType = 'carpentryshop'

  const purple = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FlooringPurple,
    name: FurnitureData[EntityTypes.FlooringPurple].name,
    price: FurnitureData[EntityTypes.FlooringPurple].price,
    y: currentY
  })
  purple.init()
  manager.pages[3].push(purple)

  currentY += deltaY

  const vertical = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FlooringWood,
    name: FurnitureData[EntityTypes.FlooringWood].name,
    price: FurnitureData[EntityTypes.FlooringWood].price,
    y: currentY
  })
  vertical.init()
  manager.pages[3].push(vertical)

  currentY += deltaY

  const tiles = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FlooringHerringbone,
    name: FurnitureData[EntityTypes.FlooringHerringbone].name,
    price: FurnitureData[EntityTypes.FlooringHerringbone].price,
    y: currentY
  })
  tiles.init()
  manager.pages[3].push(tiles)

  currentY += deltaY

  const xPaper = new BuyItemElement({
    ...config,
    selected: false,
    type: EntityTypes.FlooringCrosshatch,
    name: FurnitureData[EntityTypes.FlooringCrosshatch].name,
    price: FurnitureData[EntityTypes.FlooringCrosshatch].price,
    y: currentY
  })
  xPaper.init()
  manager.pages[3].push(xPaper)

  if (manager.currentPageIndex === 3) {
    manager.pages[3][manager.selectedItemIndex].selected = true
  }
}

function drawCurrentPage (manager, dialogBkgdRect) {
  drawBackgroundForItemCount(manager, dialogBkgdRect, manager.pages[manager.currentPageIndex].length)
  drawPageTitle(manager, dialogBkgdRect)
  drawItemsOnCurrentPage(manager)
  drawButtons(manager)
}

function drawBackgroundForItemCount (manager, dialogBkgdRect, itemCount) {
  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    manager.backgroundTop.x,
    manager.backgroundTop.y,
    manager.backgroundTop.width,
    manager.backgroundTop.height,
    manager.game.canvas.width / 2 - manager.backgroundTop.width,
    dialogBkgdRect.top,
    2 * manager.backgroundTop.width,
    2 * manager.backgroundTop.height
  )
  
  const pageLength = itemCount * (manager.itemContainer.height + 4) // + 4 accounts for spacing between items
  // add one section to make room for buttons at the bottom, add one section for the page title at the top, and one to ensure there is room for short pages
  const extraMiddleSections = itemCount <= 4 ? 3 : 2
  const numMiddleSections = extraMiddleSections + Math.ceil((pageLength - manager.backgroundTop.height - manager.backgroundBottom.height) / manager.backgroundMiddle.height)

  let currentY = dialogBkgdRect.top + manager.backgroundTop.height
  for (let i = 0; i < numMiddleSections; i++) {
    manager.game.ctx.drawImage(
      manager.imageManager.getImageWithSrc(StoreUI),
      manager.backgroundMiddle.x,
      manager.backgroundMiddle.y,
      manager.backgroundMiddle.width,
      manager.backgroundMiddle.height,
      manager.game.canvas.width / 2 - manager.backgroundMiddle.width,
      currentY,
      2 * manager.backgroundMiddle.width,
      2 * manager.backgroundMiddle.height
    )

    currentY += 2 * (manager.backgroundMiddle.height - 2 * manager.backgroundMiddle.padding)
  }

  manager.game.ctx.drawImage(
    manager.imageManager.getImageWithSrc(StoreUI),
    manager.backgroundBottom.x,
    manager.backgroundBottom.y,
    manager.backgroundBottom.width,
    manager.backgroundBottom.height,
    manager.game.canvas.width / 2 - manager.backgroundBottom.width,
    currentY,
    2 * manager.backgroundBottom.width,
    2 * manager.backgroundBottom.height
  )
}

function drawPageTitle (manager, dialogBkgdRect) {
  manager.game.ctx.fillStyle = 'black'
  manager.game.ctx.font = `48px ${FamilyNames.FarmVintage}`
  manager.game.ctx.textAlign = UIAttributes.CenterAlign
  manager.game.ctx.fillText(manager.pageTitles[manager.currentPageIndex], manager.game.canvas.width / 2, dialogBkgdRect.top + 36)
}

function drawItemsOnCurrentPage (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items.forEach(item => item.draw())
}

function drawButtons (manager) {
  manager.nextButton.draw()
  manager.prevButton.draw()
}

function checkMouseClick (manager, x, y) {
  if (manager.storeConfirmation) {
    manager.storeConfirmation.checkClicked(x, y)
  } else {
    manager.nextButton.checkClicked(x, y)
    manager.prevButton.checkClicked(x, y)
  }
}

function manageInput (manager) {
  const justDownKeys = manager.scene.inputManager.getJustDownKeys()
  const controls  = manager.scene.gameManager.getPlayerControls(EntityTypes.Player1)
  if (manager.storeConfirmation) {
    manageStoreConfirmationInput(manager, justDownKeys, controls)
  } else {
    manageBuyDialogueInput(manager, justDownKeys, controls)
  }
}

function  manageStoreConfirmationInput (manager, justDownKeys, controls) {
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.storeConfirmation = null
  }
}

function manageBuyDialogueInput (manager, justDownKeys, controls) {
  if (justDownKeys.includes(Keys.ESCAPE)) {
    manager.currentPageIndex = 0
    manager.selectedItemIndex = 0
    setButtonDisabled(manager)
    positionButtons(manager)
    manager.scene.hideBuyDialogue()
  } else if (justDownKeys.includes(controls.Action)) {
    const items = manager.pages[manager.currentPageIndex]
    const selectedItem = items[manager.selectedItemIndex]

    if (selectedItem.disabled) return

    const config = {
      game: manager.game,
      scene: manager.scene,
      manager,
      imageManager: manager.imageManager,
      entityManager: manager.entityManager,
      itemPrice: selectedItem.price,
      itemName: selectedItem.name,
      dialogRect: manager.dialogRect,
      money: manager.scene.gameManager.getMoney(),
      wood: manager.scene.gameManager.getWood(),
      buy: true
    }

    manager.storeConfirmation = new StoreConfirmation(config)
    manager.storeConfirmation.init()
    manager.storeConfirmation.setShopType(manager.shopType)
  } else if (justDownKeys.includes(Keys.ARROW_RIGHT) || justDownKeys.includes(Keys.ARROW_DOWN)) {
    selectNextItem(manager)
  } else if (justDownKeys.includes(Keys.ARROW_LEFT) || justDownKeys.includes(Keys.ARROW_UP)) {
    selectPreviousItem(manager)
  }
}

function setButtonDisabled (manager) {
  if (manager.currentPageIndex === 0) {
    manager.prevButton.setDisabled(true)
  } else {
    manager.prevButton.setDisabled(false)
  }

  if (manager.currentPageIndex === manager.pages.length - 1) {
    manager.nextButton.setDisabled(true)
  } else {
    manager.nextButton.setDisabled(false)
  }
}

function positionButtons (manager) {
  const buttonYPos = manager.pageTitleHeight + manager.pages[manager.currentPageIndex].length * 2 * manager.itemContainer.height + 10
  manager.nextButton.setPosition(manager.nextButton.x, buttonYPos)
  manager.prevButton.setPosition(manager.prevButton.x, buttonYPos)
}

function selectNextItem (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items[manager.selectedItemIndex].selected = false
  manager.selectedItemIndex = (manager.selectedItemIndex + 1) % items.length
  items[manager.selectedItemIndex].selected = true
}

function selectPreviousItem (manager) {
  const items = manager.pages[manager.currentPageIndex]
  items[manager.selectedItemIndex].selected = false
  manager.selectedItemIndex = (manager.selectedItemIndex - 1 + items.length) % items.length
  items[manager.selectedItemIndex].selected = true
}
