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
        [EntityTypes.Sunflower]: config.currentCount || 0
      },
      requirements: {
        [EntityTypes.Sunflower]: config.requiredCount || 5
      }
    }

    this.quest.progress = config.progress || this.quest.progress

    this.dialogue = {
      firstEncounter: 'Hello there! Welcome to the village!\nI am Grandma Mae. I have been here for many years,\ndon\'t let that fisherman fool you\nhe hasn\'t seen half of what he talks about\nbut I have. I hope you enjoy your stay here!',
      unknownQuest: 'Hello dear! I hope you are doing well.\nDon\'t you think the perfect bouquet needs 5 sunflowers?\nI think so too!',
      partialQuest: `Hello dear! I hope you are doing well.\nI still need ${this.quest.requirements[EntityTypes.Sunflower] - this.quest.progress[EntityTypes.Sunflower]} more sunflowers to make\nthe perfect bouquet!`,
      fullQuest: 'Hello dear! I think we were right,\n5 sunflowers DOES make the perfect bouquet!\nThank you for your help!',
      giveSunflower: 'Oh, a sunflower! Thank you dear!\nI will add this to my bouquet!',
      giveOtherGift: 'Oh, a gift! Thank you dear!\nI will cherish this!'
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
      this.quest.progress[EntityTypes.Sunflower]++
      if (this.quest.progress[EntityTypes.Sunflower] >= this.quest.requirements[EntityTypes.Sunflower]) {
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
    let dialog = ''
    if (!this.hasMetPlayer) {
      this.hasMetPlayer = true
      dialog = this.dialogue.firstEncounter
    } else if (!this.playerKnowsQuest) {
      this.playerKnowsQuest = true
      dialog = this.dialogue.unknownQuest
    } else if (this.quest.progress[EntityTypes.Sunflower] < this.quest.requirements[EntityTypes.Sunflower]) {
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