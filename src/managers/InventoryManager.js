export default class InventoryManager {
  constructor(config) {
    Object.assign(this, config)

    this.inventory = config.existingInventory || []
  }

  getInventory () {
    return this.inventory
  }

  getTools () {
    return this.inventory.filter(item => this.entityManager.isTool(item))
  }

  getSeeds () {
    return this.inventory.filter(item => this.entityManager.isSeed(item))
  }
}
