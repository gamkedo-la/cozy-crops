import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class PineTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.PineTree
    config = {...config, ...TreeData[EntityTypes.PineTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.PineTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.PineTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.PineTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.PineTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}