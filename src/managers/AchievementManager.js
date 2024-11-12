// TODO: Achievement Manager must be notified whenever a crop is planted, harvested, or sold.
// It must also be notified whenever a fish is caught or a forageable is picked up.
// It must be notified whenever a piece of furniture is purchased.
// It must be notified when any of the four quests are completed.

import EntityTypes from "../globals/EntityTypes"

export default class AchievementManager {
  constructor (config) {
    Object.assign(this, config)

    this.achievements = this.game.gameManager.getAchievements()
    this.achievementsObject = {}
    this.achievements.forEach(achievement => {
      this.achievementsObject[achievement.type] = achievement
    })
  }

  notify (event, data) {
    switch (event) {
      case 'cropHarvested':
        this.checkCropHarvested(data)
        break
      case 'cropSold':
        this.checkCropSold(data)
        break
      case 'fishCaught':
        this.checkFishCaught(data)
        break
      case 'forageablePickedUp':
        this.checkForageablePickedUp(data)
        break
      case 'furniturePurchased':
        this.checkFurniturePurchased(data)
        break
      case 'questCompleted': // Not sure this one works...
        this.checkQuestCompleted(data)
        break
    }
  }

  checkCropHarvested (data) {
    const centenialCrop = this.achievementsObject[EntityTypes.PlaqueFarming]
    centenialCrop.currentCount++
    if (centenialCrop.currentCount >= centenialCrop.requiredCount) {
      centenialCrop.complete = true
    }

    const diversityExpert = this.achievementsObject[EntityTypes.PortraitPearl]
    diversityExpert.collected.add(data.type)
    if (diversityExpert.collected.size >= diversityExpert.requiredCount) {
      diversityExpert.complete = true
    }

    this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
  }

  checkCropSold (data) {
    const masterSalesman = this.achievementsObject[EntityTypes.PlaqueSelling]
    masterSalesman.currentCount += data.price
    if (masterSalesman.currentCount >= masterSalesman.requiredCount) {
      masterSalesman.complete = true
    }

    this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
  }

  checkFishCaught (data) {
    const masterFisher = this.achievementsObject[EntityTypes.PlaqueFishing]
    masterFisher.currentCount++
    if (masterFisher.currentCount >= masterFisher.requiredCount) {
      masterFisher.complete = true
    }

    const fishCollector = this.achievementsObject[EntityTypes.PortraitMona]
    fishCollector.collected.add(data.type)
    if (fishCollector.collected.size >= fishCollector.requiredCount) {
      fishCollector.complete = true
    }

    this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
  }

  checkForageablePickedUp (data) {
    const masterGatherer = this.achievementsObject[EntityTypes.PlaqueForaging]
    masterGatherer.currentCount++
    if (masterGatherer.currentCount >= masterGatherer.requiredCount) {
      masterGatherer.complete = true
    }

    const gathererExtrodinaire = this.achievementsObject[EntityTypes.PortraitRGB]
    gathererExtrodinaire.collected.add(data.type)
    if (gathererExtrodinaire.collected.size >= gathererExtrodinaire.requiredCount) {
      gathererExtrodinaire.complete = true
    }

    this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
  }

  checkFurniturePurchased (data) {
    const antiqueCollector = this.achievementsObject[EntityTypes.PlaqueFurniture]
    antiqueCollector.currentCount++
    if (antiqueCollector.currentCount >= antiqueCollector.requiredCount) {
      antiqueCollector.complete = true
    }

    const furnitureAficionado = this.achievementsObject[EntityTypes.PortraitStarry]
    furnitureAficionado.collected.add(data.type)
    if (furnitureAficionado.collected.size >= furnitureAficionado.requiredCount) {
      furnitureAficionado.complete = true
    }

    this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
  }

  checkQuestCompleted (data) {
    let quest = null
    switch (data.quest) {
      case 'Favored Grandchild':
        quest = this.achievementsObject[EntityTypes.StatueBust]
        break
      case 'Jo Jo\'s Friend':
        break
      case 'Bob\'s Paul Bunyan':
        break
      case 'Tiffany\'s Souper Friend':
        break
    }

    if (quest) {
      quest.complete = true
      let allComplete = (this.achievementsObject[EntityTypes.StatueFossil].complete) &&
                        (this.achievementsObject[EntityTypes.StatueBust].complete) &&
                        (this.achievementsObject[EntityTypes.StatueGoddess].complete) &&
                        (this.achievementsObject[EntityTypes.StatueKing].complete)
      if (allComplete) {
        this.achievementsObject[EntityTypes.PortraitWave].complete = true
      }

      this.game.gameManager.setAchievements(Object.values(this.achievementsObject))
    }
  }
}