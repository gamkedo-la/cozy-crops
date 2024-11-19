export const Seasons = {
  Cool: 1,
  Hot: 2,
  Rainy: 3
}

export const SeasonNames =  ['Cool', 'Hot', 'Rainy']

export const LengthOfDay = 5 * 60 * 1000 // 5 minutes converted to milliseconds
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

const Calendar = {
  LengthOfDay,
  DaysPerWeek,
  WeeksPerSeason,
  SeasonLength,
  SeasonsPerYear,
  Seasons,
  SeasonNames,
  WeatherProbabilities
}

export default Calendar