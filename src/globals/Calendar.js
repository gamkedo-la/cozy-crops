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

const Calendar = {
  LengthOfDay,
  DaysPerWeek,
  WeeksPerSeason,
  SeasonLength,
  SeasonsPerYear,
  Seasons,
  SeasonNames,
}

export default Calendar