import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class OrangeTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.OrangeTree
    config = {...config, ...TreeData[EntityTypes.OrangeTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.OrangeTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.OrangeTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.OrangeTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.OrangeTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}