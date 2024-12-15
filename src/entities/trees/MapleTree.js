import Tree from './Tree.js'
import TreeAnimations from '../../globals/TreeAnimations.js'
import TreeData from '../../globals/TreeData.js'
import Animation from '../../components/Animation.js'
import EntityTypes from '../../globals/EntityTypes.js'

export default class MapleTree extends Tree {
  constructor (config) {
    config.type = EntityTypes.MapleTree
    config = {...config, ...TreeData[EntityTypes.MapleTree]}
    super(config)
  }

  buildAnimations () {
    const animationKeys = Object.keys(TreeAnimations.MapleTree)
    animationKeys.forEach((key, index) => {
      const config = Object.assign({}, TreeAnimations.MapleTree[key])
      config.owner = this
      config.game = this.game
      config.imageManager = this.imageManager
      config.imageSrc = TreeAnimations.MapleTree[key].spritesheet
      config.canvas = this.imageManager.getImageWithSrc(TreeAnimations.MapleTree[key].spritesheet)
      this.animations[key] = new Animation(config)
    })
  }

  getAnimation () {
    return this.animations[this.growthStages[this.currentGrowthStage]]
  }
}