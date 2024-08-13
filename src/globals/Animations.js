import { Steve } from './Images.js'

const Animations = {
  SteveIdleUp,
  SteveIdleDown,
  SteveIdleLeft,
  SteveIdleRight,
  SteveWalkUp,
  SteveWalkDown,
  SteveWalkLeft,
  SteveWalkRight
}

export default Animations
export const {
  SteveIdleUp,
  SteveIdleDown,
  SteveIdleLeft,
  SteveIdleRight,
  SteveWalkUp,
  SteveWalkDown,
  SteveWalkLeft,
  SteveWalkRight
} = Animations

const SteveIdleUp = {
  name: 'SteveIdleUp',
  spritesheet: Steve,
  frames: [16, 17, 18, 19],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}

const SteveIdleDown = {
  name: 'SteveIdleDown',
  spritesheet: Steve,
  frames: [0, 1, 2, 3],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}

const SteveIdleLeft = {
  name: 'SteveIdleLeft',
  spritesheet: Steve,
  frames: [5, 6, 7, 8],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: true
}

const SteveIdleRight = {
  name: 'SteveIdleRight',
  spritesheet: Steve,
  frames: [5, 6, 7, 8],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}

const SteveWalkUp = {
  name: 'SteveWalkUp',
  spritesheet: Steve,
  frames: [24, 25, 26, 27],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}

const SteveWalkDown = {
  name: 'SteveWalkDown',
  spritesheet: Steve,
  frames: [8, 9, 10, 11],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}

const SteveWalkLeft = {
  name: 'SteveWalkLeft',
  spritesheet: Steve,
  frames: [12, 13, 14, 15],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: true
}

const SteveWalkRight = {
  name: 'SteveWalkRight',
  spritesheet: Steve,
  frames: [12, 13, 14, 15],
  frameWidth: 16,
  frameHeight: 32,
  duration: 100,
  loop: true,
  flip: false
}