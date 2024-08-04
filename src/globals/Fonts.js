const FontKeys = {
  // paths are relative to the root of the project where the WebFont loading script is run
  FarmVintage: './src/fonts/FarmVintage/FARMVINTAGE.ttf',
  HelloFarmer: './src/fonts/HelloFarmer/Hello Farmer Font by Keithzo.ttf',
  LuckyFarmer: './src/fonts/LuckyFarmer/Lucky Farmer Font by Keithzo.ttf',
  MedievalSharp: './src/fonts/MedievalSharp/MedievalSharp-Regular.ttf',
  Tangerine: './src/fonts/Tangerine/Tangerine-Regular.ttf',
  TangerineBold: './src/fonts/Tangerine/Tangerine-Bold.ttf'
}

export const FamilyNames = {
  MedievalSharpRegular: 'MedievalSharp-Regular',
  TangerineRegular: 'Tangerine-Regular',
  TangerineBold: 'Tangerine-Bold',
  FarmVintage: 'FarmVintage',
  HelloFarmer: 'HelloFarmer',
  LuckyFarmer: 'LuckyFarmer'
}

export const FontFamilies = {
  MedievalSharpRegular: FamilyNames.MedievalSharpRegular,
  TangerineRegular: FamilyNames.TangerineRegular,
  TangerineBold: FamilyNames.TangerineBold,
  FarmVintage: FamilyNames.FarmVintage,
  HelloFarmer: FamilyNames.HelloFarmer,
  LuckyFarmer: FamilyNames.LuckyFarmer
}

export const StyleConfigs = [
  `@font-face {
    font-family: "${FamilyNames.MedievalSharpRegular}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.MedievalSharp}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.TangerineRegular}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.Tangerine}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.TangerineBold}";
    font-style: normal;
    font-weight: 700;
    src: url('${FontKeys.TangerineBold}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.FarmVintage}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.FarmVintage}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.HelloFarmer}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.HelloFarmer}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.LuckyFarmer}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.LuckyFarmer}') format('truetype');
  }`
]

export default FontKeys
export const {
  MedievalSharp,
  Tangerine,
  TangerineBold,
  FarmVintage,
  HelloFarmer,
  LuckyFarmer
} = FontKeys