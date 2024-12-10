import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class AppleTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.AppleTree
    config = {...config, ...TreeData[EntityTypes.AppleTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.AppleTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.AppleTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.AppleTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.AppleTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}