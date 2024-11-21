import NPC from './NPC.js'
import { TiffanyAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Tiffany extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Tiffany
    this.collisionPoint = { x: 0, y: 0 }
    this.quest = {
      name: 'Tiffany Sue\'s Quest',
      achievement: 'Tiffany\'s Souper Friend',
      description: 'Give 1 onion, 1 tomato, 1 carrot, and 1 pumpkin to Tiffany Sue so she can make a soup',
      progress: {
        [EntityTypes.Onion]: config.currentCount || 0,
        [EntityTypes.Tomato]: config.currentCount || 0,
        [EntityTypes.Carrot]: config.currentCount || 0,
        [EntityTypes.Pumpkin]: config.currentCount || 0
      },
      requirements: {
        [EntityTypes.Onion]: config.requiredCount || 1,
        [EntityTypes.Tomato]: config.requiredCount || 1,
        [EntityTypes.Carrot]: config.requiredCount || 1,
        [EntityTypes.Pumpkin]: config.requiredCount || 1
      }
    }

    this.quest.progress = config.progress || this.quest.progress

    this.dialogue = {
      firstEncounter: 'Hello there! Welcome to the village!\nI am Tiffany Sue. I just love making soup!\nI hope you enjoy your stay here!',
      unknownQuest: 'Hello again! I hope you are doing well.\nI am working on a new soup and need a few more ingredients,\nbut there just isn\'t time to grow them!\nI hope you are doing well!',
      partialQuest: getPartialQuestString(this),
      fullQuest: 'Thank you for your help! I have enough ingredients to finish my soup now!\nYou\'re an incredible person to help so much! I\'ll make you a bowl!',
      giveOnion: 'Oh, an onion! Thank you! This will help me finish my soup!\nI hope you enjoy it as much as I do!',
      giveExtraOnion: 'Oh another onion! Thank you! I will save this for my next soup!',
      giveTomato: 'Oh, a tomato! Thank you! This will help me finish my soup!\nI hope you enjoy it as much as I do!',
      giveExtraTomato: 'Oh another tomato! Thank you! I will save this for my next soup!',
      giveCarrot: 'Oh, a carrot! Thank you! This will help me finish my soup!\nI hope you enjoy it as much as I do!',
      giveExtraCarrot: 'Oh another carrot! Thank you! I will save this for my next soup!',
      givePumpkin: 'Oh, a pumpkin! Thank you! This will help me finish my soup!\nI hope you enjoy it as much as I do!',
      giveExtraCarrot: 'Oh another pumpkin! Thank you! I will save this for my next soup!',
      giveOtherGift: 'Oh, a gift! Thank you so much!\nI will cherish this!'
    }
  }

  buildAnimations () {
    const animationKeys = Object.keys(TiffanyAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TiffanyAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TiffanyAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TiffanyAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  giveItem (item) {
    if (item.type === EntityTypes.Onion) {
      this.quest.progress[EntityTypes.Onion]++
      if (this.quest.progress[EntityTypes.Onion] >= this.quest.requirements[EntityTypes.Onion]) {
        if (this.checkComplete()) {
          return this.dialogue.fullQuest
        } else {
          return this.dialogue.giveOnion
        }
      } else {
        return this.dialogue.giveExtraOnion
      }
    } else if (item.type === EntityTypes.Carrot) {
      this.quest.progress[EntityTypes.Carrot]++
      if (this.quest.progress[EntityTypes.Carrot] >= this.quest.requirements[EntityTypes.Carrot]) {
        if (this.checkComplete()) {
          return this.dialogue.fullQuest
        } else {
          return this.dialogue.giveCarrot
        }
      } else {
        return this.dialogue.giveExtraCarrot
      }
    } else if (item.type === EntityTypes.Tomato) {
      this.quest.progress[EntityTypes.Tomato]++
      if (this.quest.progress[EntityTypes.Tomato] >= this.quest.requirements[EntityTypes.Tomato]) {
        if (this.checkComplete()) {
          return this.dialogue.fullQuest
        } else {
          return this.dialogue.giveTomato
        }
      } else {
        return this.dialogue.giveExtraTomato
      }
    } else if (item.type === EntityTypes.Pumpkin) {
      this.quest.progress[EntityTypes.Pumpkin]++
      if (this.quest.progress[EntityTypes.Pumpkin] >= this.quest.requirements[EntityTypes.Pumpkin]) {
        if (this.checkComplete()) {
          return this.dialogue.fullQuest
        } else {
          return this.dialogue.givePumpkin
        }
      } else {
        return this.dialogue.giveExtraPumpkin
      }
    } else {
      return this.dialogue.giveOtherGift
    }
  }

  getDialogue () {
    let dialog = ''
    if (!this.hasMetPlayer) {
      this.hasMetPlayer = true
      dialog = this.dialogue.firstEncounter
    } else if (!this.playerKnowsQuest) {
      this.playerKnowsQuest = true
      dialog = this.dialogue.unknownQuest
    } else if (!this.checkComplete()) {
      dialog = getPartialQuestString(this)
    }

    this.scene.gameManager.setNPCData(this.type, {
      hasMetPlayer: this.hasMetPlayer,
      playerKnowsQuest: this.playerKnowsQuest,
      questComplete: this.checkComplete()
    })

    return dialog
  }

  checkComplete () {
    return this.quest.progress[EntityTypes.Onion] >= this.quest.requirements[EntityTypes.Onion] &&
      this.quest.progress[EntityTypes.Tomato] >= this.quest.requirements[EntityTypes.Tomato] &&
      this.quest.progress[EntityTypes.Carrot] >= this.quest.requirements[EntityTypes.Carrot] &&
      this.quest.progress[EntityTypes.Pumpkin] >= this.quest.requirements[EntityTypes.Pumpkin]
  }
}

function getPartialQuestString (tiffany) {
  const remainingOnionCount =  tiffany.quest.requirements[EntityTypes.Onion] - tiffany.quest.progress[EntityTypes.Onion]
  const remainingTomatoCount =  tiffany.quest.requirements[EntityTypes.Tomato] - tiffany.quest.progress[EntityTypes.Tomato]
  const remainingCarrotCount =  tiffany.quest.requirements[EntityTypes.Carrot] - tiffany.quest.progress[EntityTypes.Carrot]
  const remainingPumpkinCount =  tiffany.quest.requirements[EntityTypes.Pumpkin] - tiffany.quest.progress[EntityTypes.Pumpkin]

  const remainingOnionString = remainingOnionCount > 0 ? `${remainingOnionCount} more onion${remainingTomatoCount > 0 || remainingCarrotCount > 0 || remainingPumpkinCount > 0 ? ', ' : ' '}` : ''
  const remainingTomatoString = remainingTomatoCount > 0 ? `${remainingOnionCount > 0 && remainingCarrotCount <= 0 && remainingPumpkinCount <= 0 ? ', and ' : ''}${remainingTomatoCount} more tomato${remainingCarrotCount > 0 || remainingPumpkinCount > 0 ? ', ' : ' '}` : ''
  const remainingCarrotString = remainingCarrotCount > 0 ? `${(remainingOnionCount > 0 || remainingCarrotCount > 0) && (remainingPumpkinCount <= 0) ? ', and ' : ''}${remainingCarrotCount} more carrot${remainingPumpkinCount > 0 ? ', ' : ' '}` : ''
  const remainingPumpkinString = remainingPumpkinCount > 0 ? `${remainingOnionCount > 0 || remainingTomatoCount > 0 || remainingCarrotCount > 0 ? '\nand ' : ''}${remainingPumpkinCount} more pumpkin` : ''

  return `Good to see you! I am still working on my soup and\nneed ${remainingOnionString}${remainingTomatoString}${remainingCarrotString}${remainingPumpkinString} to finish it!`
}