import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class OakTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.OakTree
    config = {...config, ...TreeData[EntityTypes.OakTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.OakTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.OakTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.OakTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.OakTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}