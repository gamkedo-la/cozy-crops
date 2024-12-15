import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class CherryTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.CherryTree
    config = {...config, ...TreeData[EntityTypes.CherryTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.CherryTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.CherryTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.CherryTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.CherryTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}