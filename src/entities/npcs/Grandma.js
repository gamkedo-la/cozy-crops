import NPC from './NPC.js'
import { GrandmaAnimations } from '../../globals/NPCAnimations.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class Grandma extends NPC {
  constructor (config) {
    super(config)
    
    this.type =  EntityTypes.Grandma
    this.collisionPoint = { x: 0, y: 0 }
    this.quest = {
      name: 'Grandma Mae\'s Quest',
      achievement: 'Favored Grandchild',
      description: 'Give Grandma Mae 5 sunflowers so she can make a bouquet',
      progress: {
        sunflowers: config.currentCount || 0
      },
      requirements: {
        sunflowers: config.requiredCount || 5
      }
    }

    this.quest.progress = config.progress || this.quest.progress

    this.dialogue = {
      firstEncounter: 'Hello there! Welcome to the village! I am the village Grandma. I have been here for many years and have seen many things. I hope you enjoy your stay here!',
      unknownQuest: 'Hello dear! I hope you are doing well. Don\'t you think the perfect bouquet needs 5 sunflowers? I think so too!',
      partialQuest: `Hello dear! I hope you are doing well. I still need ${this.quest.requirements.sunflowers - this.quest.progress.sunflowers} more sunflowers to make the perfect bouquet!`,
      fullQuest: 'Hello dear! I think we were right, 5 sunflowers DOES make the perfect bouquet! Thank you for your help!',
      giveSunflower: 'Oh, a sunflower! Thank you dear! I will add this to my bouquet!',
      giveOtherGift: 'Oh, a gift! Thank you dear! I will cherish this!'
    }
  }

  buildAnimations () {
    const animationKeys = Object.keys(GrandmaAnimations)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, GrandmaAnimations[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = GrandmaAnimations[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(GrandmaAnimations[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation (type = 'Idle') {
    return this.animations[type]
  }

  giveItem (item) {
    if (item.type === EntityTypes.Sunflower) {
      this.quest.progress.sunflowers++
      if (this.quest.progress.sunflowers >= this.quest.requirements.sunflowers) {
        this.questComplete = true
        return this.dialogue.fullQuest
      } else {
        return this.dialogue.giveSunflower
      }
    } else {
      return this.dialogue.giveOtherGift
    }
  }

  getDialogue () {
    if (!this.hasMetPlayer) {
      this.hasMetPlayer = true
      return this.dialogue.firstEncounter
    } else if (!this.playerKnowsQuest) {
      this.playerKnowsQuest = true
      return this.dialogue.unknownQuest
    } else if (this.quest.progress.sunflowers < this.quest.requirements.sunflowers) {
      return this.dialogue.partialQuest
    }
  }
}