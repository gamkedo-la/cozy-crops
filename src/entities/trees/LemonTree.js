import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class LemonTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.LemonTree
    config = {...config, ...TreeData[EntityTypes.LemonTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.LemonTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.LemonTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.LemonTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.LemonTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}