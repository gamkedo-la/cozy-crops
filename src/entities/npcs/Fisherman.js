import NPC from './NPC.js'
import { FishermanAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Fisherman extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Fisherman
    this.collisionPoint = { x: 0, y: 0 }
    this.quest = {
      name: 'Fisherman Jo Jo\'s Quest',
      achievement: 'Jo Jo\'s Friend',
      description: 'Catch 1 tuna and give it to the Fisherman. He has a fishing story to tell',
      progress: {
        [EntityTypes.Tuna]: config.currentCount || 0
      },
      requirements: {
        [EntityTypes.Tuna]: config.requiredCount || 1
      }
    }

    this.quest.progress = config.progress || this.quest.progress

    this.dialogue = {
      firstEncounter: 'Hello there! Welcome to the village!\nI am Fisherman Jo Jo. I have been here for many years\nand have seen many things, BIG things, if you catch my drift.\nI hope you enjoy your stay here!',
      unknownQuest: 'Hello again! I hope you are doing well.\nWhen I have a big Tuna, I remember a time when...\nOh, nevermind. Have a good day!',
      partialQuest: `Good to see you! Don\'t you think Tuna are best fish?\nDid you hear about the time I lost my rudder to a hungry Tuna?`,
      fullQuest: 'Did I ever tell you the one about the Tuna that ate my rudder?\nOh, you haven\'t heard that one? Well, come by for dinner one day and I\'ll talk yer ear off!',
      giveTuna: 'Oh, a Tuna! Thank you! I have a story about a Tuna that ate my rudder!\nI hope you enjoy it as much as I do!',
      giveOtherGift: 'Oh, a gift! Thank you so much!\nI will cherish this!'
    }
  }

  buildAnimations () {
    const animationKeys = Object.keys(FishermanAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, FishermanAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = FishermanAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(FishermanAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  giveItem (item) {
    if (item.type === EntityTypes.Tuna) {
      this.quest.progress[EntityTypes.Tuna]++
      if (this.quest.progress[EntityTypes.Tuna] >= this.quest.requirements[EntityTypes.Tuna]) {
        this.questComplete = true
        return this.dialogue.fullQuest
      } else {
        return this.dialogue.giveTuna
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
    } else if (this.quest.progress[EntityTypes.Tuna] < this.quest.requirements[EntityTypes.Tuna]) {
      dialog = this.dialogue.partialQuest
    }

    this.scene.gameManager.setNPCData(this.type, {
      hasMetPlayer: this.hasMetPlayer,
      playerKnowsQuest: this.playerKnowsQuest,
      questComplete: this.questComplete
    })

    return dialog
  }
}