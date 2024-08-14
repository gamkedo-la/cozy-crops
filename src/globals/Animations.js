import { Steve } from './Images.js'

export const SteveIdleUp = {
  name: 'SteveIdleUp',
  spritesheet: Steve,
  frames: [16, 17, 18, 19],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 500,
  loop: true
}

export const SteveIdleDown = {
  name: 'SteveIdleDown',
  spritesheet: Steve,
  frames: [0, 1, 2, 3],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 500,
  loop: true
}

export const SteveIdleLeft = {
  name: 'SteveIdleLeft',
  spritesheet: Steve,
  frames: [20, 21, 22, 23],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 500,
  loop: true
}

export const SteveIdleRight = {
  name: 'SteveIdleRight',
  spritesheet: Steve,
  frames: [4, 5, 6, 7],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 500,
  loop: true
}

export const SteveWalkUp = {
  name: 'SteveWalkUp',
  spritesheet: Steve,
  frames: [24, 25, 26, 27],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 250,
  loop: true
}

export const SteveWalkDown = {
  name: 'SteveWalkDown',
  spritesheet: Steve,
  frames: [8, 9, 10, 11],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 250,
  loop: true
}

export const SteveWalkLeft = {
  name: 'SteveWalkLeft',
  spritesheet: Steve,
  frames: [28, 29, 30, 31],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 250,
  loop: true
}

export const SteveWalkRight = {
  name: 'SteveWalkRight',
  spritesheet: Steve,
  frames: [12, 13, 14, 15],
  frameWidth: 16,
  frameHeight: 32,
  padding: 1,
  duration: 250,
  loop: true
}

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
