import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

export default (id, property, state) => {
  const nth = Object.values(state).filter(obj => obj.type == property.id).length + 1

  return {

    id: id,

    // what level of property this instance is
    type: property.id,

    // the display name of this instance
    name: property.name,

    // the display color of this instance
    color: property.color,

    // the currency name of this instance (deer, sheep .etc)
    currencyName: property.currencyName,

    // the research name of this instance (venison, wool .etc)
    researchName: property.researchName,

    // amount accumulated toward auto completion when progress is 100
    autoComplete: 0,

    // whether this instance has completed its goal and been marked as "complete"
    complete: false,

    // the computed progress towards the current goal for display purposes
    progress: 0,

    // the goal for this instance (just income goals for now, this should have more variety)
    goal: 100,

    // how much money the instance has accumulated
    money: property.research("startMoney"),

    // how much autoBuy each building should accumulate next tick
    autoBuy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    // get the buildings that belong to this instance
    // TODO: this shouldn't need to be computed
    buildings() {
      const start = this.id*10
      const buildings = store.getState().buildings
      return Object.values(buildings).slice(start, start + 10)
    },

    // compute income from all buildings as well as passive income from research
    income() {
      return this.buildingIncome() + this.passiveIncome()
    },

    passiveIncome() {
      return this.property().research("passiveIncome")
    },

    buildingIncome() {
      return this.buildings().reduce((a, b) => a + b.income(), 0)
    },

    // how many seconds it takes to auto complete this instance
    autoCompleteDuration() {
      return this.property().research("autoComplete")
    },

    // shorthand to the property
    property() {
      return store.getState().properties[this.type]
    }

  }
}
