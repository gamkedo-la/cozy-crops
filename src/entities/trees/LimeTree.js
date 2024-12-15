import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class LimeTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.LimeTree
    config = {...config, ...TreeData[EntityTypes.LimeTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.LimeTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.LimeTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.LimeTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.LimeTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}