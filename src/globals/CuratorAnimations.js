import { Curator } from './Images.js'

export const Idle = {
  name: 'CuratorIdle',
  spritesheet: Curator,
  frames: [0, 1, 2, 3],
  frameWidth: 18,
  frameHeight: 39,
  padding: 1,
  duration: 500,
  loop: true
}

const CuratorAnimations = {
  Idle
}

export default CuratorAnimations
