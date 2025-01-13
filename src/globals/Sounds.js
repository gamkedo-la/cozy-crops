import { ENV } from './Environment.js'

const path = ENV === 'development' ? '../../sounds/' : 'sounds/'

const Sounds = {
  BackgroundMusic: `${path}cozyCropsMainBackgroundMusic.mp3`,
  RainSound: `${path}rain.mp3`,
  WindSound: `${path}wind.mp3`,
  BackgroundBirds: `${path}birds.mp3`,
  BackgroundWaterfall: `${path}waterfall.mp3`,
  BackgroundSeashore: `${path}seashore.mp3`,
  waterGroundSound: `${path}waterGround.mp3`,
  tillGroundSound: `${path}tillGround.mp3`,
  openDoorSound: `${path}openDoor.mp3`,
  harvestCropSound: `${path}harvestCrop.mp3`,
  plantSeedSound: `${path}plantSeed.mp3`,
  stepSound1: `${path}footStep1.wav`,
  stepSound2: `${path}footStep2.wav`,
  stepSound3: `${path}footStep3.wav`,
  stepSound4: `${path}footStep4.wav`,
  treeChopSound: `${path}treeChopping.wav`,
}

export default Sounds
export const {
  BackgroundMusic,
  RainSound,
  WindSound,
  BackgroundBirds,
  BackgroundWaterfall,
  BackgroundSeashore,
  waterGroundSound,
  tillGroundSound,
  openDoorSound,
  harvestCropSound,
  plantSeedSound,
  stepSound1,
  stepSound2,
  stepSound3,
  stepSound4,    
  treeChopSound,
 } =  Sounds