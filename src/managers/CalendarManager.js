import Calendar from '../globals/Calendar.js'

export default class CalendarManager {
  /**
   * Creates an instance of InputManager.
   * 
   * @param {Object} config - The configuration object.
   * @param {Game} config.game - An instance of the Game class.
   * @param {EventManager} config.eventManager - An instance of the EventManager class.
   */
  constructor(config) {
    Object.assign(this, config)
    this.year = 1
    this.season = 1
    this.seasonDisplay = Calendar.SeasonNames[this.season]
    this.week = 1
    this.day = 1
    this.elapsedTime = 0
  }

  setStartDate(year, season, week, day) {
    this.year = year ? year : this.year
    this.season = season ? season : this.season
    this.seasonDisplay = Calendar.SeasonNames[this.season]
    this.week = week ? week : this.week
    this.day = day ? day : this.day
    this.gameManager.setDate({ year: this.year, season: this.season, week: this.week, day: this.day })
  }

  advanceDay () {
    this.day++
    dateCheck(this)
    this.gameManager.setDate({ year: this.year, season: this.season, week: this.week, day: this.day })
    console.log('Season:', this.seasonDisplay, 'Week:', this.week, 'Day: ', this.day, 'Year:', this.year)
  }

  advanceWeek () {
    this.week++
    dateCheck(this)
    this.gameManager.setDate({ year: this.year, season: this.season, week: this.week, day: this.day })
    console.log('Season:', this.seasonDisplay, 'Week:', this.week, 'Day: ', this.day, 'Year:', this.year)
  }

  advanceSeason () {
    this.season++
    dateCheck(this)
    this.gameManager.setDate({ year: this.year, season: this.season, week: this.week, day: this.day })
    console.log('Season:', this.seasonDisplay, 'Week:', this.week, 'Day: ', this.day, 'Year:', this.year)
  }

  advanceYear () {
    this.year++
    dateCheck(this)
    this.gameManager.setDate({ year: this.year, season: this.season, week: this.week, day: this.day })
    console.log('Season:', this.seasonDisplay, 'Week:', this.week, 'Day: ', this.day, 'Year:', this.year)
  }

  getDate () {
    return { year: this.year, season: this.season, seasonDisplay: this.seasonDisplay, week: this.week, day: this.day, totalDays: this.day + (this.week - 1) * Calendar.DaysPerWeek + (this.season - 1) * Calendar.DaysPerWeek * Calendar.WeeksPerSeason + (this.year - 1) * Calendar.DaysPerWeek * Calendar.WeeksPerSeason * Calendar.SeasonsPerYear }
  }

  update (deltaTime) {
    this.elapsedTime += deltaTime
    if (this.elapsedTime >= Calendar.DayLength) {
      this.day++
      this.elapsedTime -= Calendar.DayLength // Reset the elapsed time, but keep any overflow.
      dateCheck(this)
      this.gameManager.newDaySave({ year: this.year, season: this.season, week: this.week, day: this.day })
    }
  }
}

function dateCheck(manager) {
  if (manager.day >= (Calendar.DaysPerWeek)) { //season length +1, since we're starting days at 1, we're adding 1 to the season length
    manager.week++
    manager.day = 1
  }

  if (manager.week > Calendar.WeeksPerSeason) {
    manager.season++
    manager.week = 1
  }

  if (manager.season > Calendar.SeasonsPerYear) {
    manager.year++
    manager.season = 1
  }

  convertSeason(manager)
}

function convertSeason (manager) {
  switch(manager.season) {
  case 1: manager.seasonDisplay = "Cool"
    break
  case 2: manager.seasonDisplay = "Hot"
    break
  case 3: manager.seasonDisplay = "Rainy"
    break
  }
}