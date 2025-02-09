import NPC from './NPC.js'
import { LumberjackAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Lumberjack extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Lumberjack
    this.collisionPoint = { x: 0, y: 0 }
    this.quest = {
      name: 'Bobbi\'s Paul Bunyan',
      achievement: 'Lumberjack Bobbi\'s Quest',
      description: 'Give 20 wood to Lumberjack Bobbi so she can finish the project she is working on',
      progress: {
        wood: config.currentCount || 0
      },
      requirements: {
        wood: config.requiredCount || 20
      }
    }

    this.quest.progress = config.progress || this.quest.progress

    this.dialogue = {
      firstEncounter: 'Hello there! Welcome to the village!\nI am Lumberjack Bobbi. I have built many houses for the villagers\nand I am working on a new project. I hope you enjoy your stay here!',
      unknownQuest: 'Hello again! I hope you are doing well.\nI am working on a new project and need a lot more wood,\nbut there just isn\'t time to chop it and build it!\nI hope you are doing well!',
      partialQuest: () => { return `Good to see you! I am still working on my project and\nneed ${this.quest.requirements.wood - this.quest.progress.wood} more wood to finish it!` },
      fullQuest: 'Thank you for your help! I have enough wood to finish my project now!\nYou\'re an incredible person to help so much!',
      giveWood: 'Oh, wood! Thank you! This will help me finish my project!\nI hope you enjoy it as much as I do!',
      giveOtherGift: 'Oh, a gift! Thank you so much!\nI will cherish this!'
    }
  }

  init () {
    super.init()
    const progress = this.scene.gameManager.getAchievementProgress(this.quest.name)
    if (progress) {
      this.quest.progress.wood = progress
    }
  }

  buildAnimations () {
    const animationKeys = Object.keys(LumberjackAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, LumberjackAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = LumberjackAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(LumberjackAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  giveItem (item, quantity) {
    if (this.scene.entityManager.isWood(item)) {
      this.quest.progress.wood += quantity
      this.scene.gameManager.setAchievementProgress(this.quest.name, this.quest.progress.wood)
      if (this.quest.progress.wood >= this.quest.requirements.wood) {
        this.questComplete = true
        return this.dialogue.fullQuest
      } else {
        return this.dialogue.giveWood
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
    } else if (this.quest.progress.wood < this.quest.requirements.wood) {
      dialog = this.dialogue.partialQuest()
    } else if (this.quest.progress.wood >= this.quest.requirements.wood) {
      dialog = this.dialogue.fullQuest
    }

    this.scene.gameManager.setNPCData(this.type, {
      hasMetPlayer: this.hasMetPlayer,
      playerKnowsQuest: this.playerKnowsQuest,
      questComplete: this.questComplete
    })

    return dialog
  }
}