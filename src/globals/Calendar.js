export const Seasons = {
  Cool: 1,
  Hot: 2,
  Rainy: 3
}

export const SeasonNames =  ['Cool', 'Hot', 'Rainy']

export const LengthOfDay = 2 * 60 * 1000 // 2 minutes converted to milliseconds
export const DaysPerWeek = 3
export const WeeksPerSeason = 3
export const SeasonLength = WeeksPerSeason * DaysPerWeek
export const SeasonsPerYear = Object.keys(Seasons).length
export const WeatherProbabilities = {
  Cool: {
    Cool: 0.4,
    Fog: 0.2,
    Rain: 0,
    Snow: 0.2,
    Wind: 0.2
  },
  Hot: {
    Cool: 0,
    Fog: 0.1,
    Rain: 0.1,
    Snow: 0,
    Wind: 0.1
  },
  Rainy: {
    Cool: 0.2,
    Fog: 0.1,
    Rain: 0.5,
    Snow: 0.1,
    Wind: 0.1
  }
}

// 8:00 AM is 1/3 of the way through the day
export const ShopOpeningTime = 0 // LengthOfDay / 4 // not realistic, but keeps shop open during the day
// 8:00 PM is 2/3 of the way through the day
export const ShopClosingTime = LengthOfDay * 3 / 4 // not realistic, but keeps shop open during the day

const Calendar = {
  LengthOfDay,
  ShopOpeningTime,
  ShopClosingTime,
  DaysPerWeek,
  WeeksPerSeason,
  SeasonLength,
  SeasonsPerYear,
  Seasons,
  SeasonNames,
  WeatherProbabilities
}

export default Calendar