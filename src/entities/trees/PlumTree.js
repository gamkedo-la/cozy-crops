import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class PlumTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.PlumTree
    config = {...config, ...TreeData[EntityTypes.PlumTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.PlumTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.PlumTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.PlumTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.PlumTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}