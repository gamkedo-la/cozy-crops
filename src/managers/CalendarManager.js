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
    this.year = 0
    this.season = 0
    this.seasonDisplay = Calendar.SeasonNames[this.season]
    this.week = 0
    this.day = 0
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
    return { year: this.year + 1, season: this.season + 1, seasonDisplay: this.seasonDisplay, week: this.week + 1, day: this.day + 1, dayOfSeason: (this.week * Calendar.DaysPerWeek) + this.day + 1 }
  }

  getTimeOfDay () {
    return this.elapsedTime
  }

  update (deltaTime) {
    this.elapsedTime += deltaTime
    if (this.elapsedTime >= Calendar.LengthOfDay) {
      this.day++
      this.elapsedTime -= Calendar.LengthOfDay // Reset the elapsed time, but keep any overflow.
      dateCheck(this)
      this.gameManager.newDaySave({ year: this.year, season: this.season, week: this.week, day: this.day })
      this.game.sceneManager.currentScene.reachedEndOfDay()
    }
  }
}

function dateCheck(manager) {
  if (manager.day >= (Calendar.DaysPerWeek)) { //season length +1, since we're starting days at 1, we're adding 1 to the season length
    manager.week++
    manager.day = 0
  }

  if (manager.week >= Calendar.WeeksPerSeason) {
    manager.season++
    manager.week = 0
  }

  if (manager.season >= Calendar.SeasonsPerYear) {
    manager.year++
    manager.season = 0
  }

  manager.seasonDisplay = Calendar.SeasonNames[manager.season]

  if (manager.season > Calendar.SeasonsPerYear) {
    manager.year++
    manager.season = 0
  }
}