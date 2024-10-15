import { Tools } from './Images.js'

export const HoeCopper = {
  Inventory: {
    name: 'HoeCopperInventory',
    spritesheet: Tools,
    frames: [1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const HoeSteel = {
  Inventory: {
    name: 'HoeSteelInventory',
    spritesheet: Tools,
    frames: [1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const HoeWooden = {
  Inventory: {
    name: 'WateringCanWoodenInventory',
    spritesheet: Tools,
    frames: [1],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const WateringCanCopper = {
  Inventory: {
    name: 'WateringCanCopperInventory',
    spritesheet: Tools,
    frames: [0],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const WateringCanSteel = {
  Inventory: {
    name: 'WateringCanSteelInventory',
    spritesheet: Tools,
    frames: [0],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

export const WateringCanWooden = {
  Inventory: {
    name: 'WateringCanWoodenInventory',
    spritesheet: Tools,
    frames: [0],
    frameWidth: 16,
    frameHeight: 16,
    padding: 1,
    duration: 500,
    loop: true
  }
}

const ToolAnimations = {
  HoeCopper,
  HoeSteel,
  HoeWooden,
  WateringCanCopper,
  WateringCanSteel,
  WateringCanWooden
}

export default ToolAnimations
