var MCISummary = function () {
  this.Initilisation = {}
  for (let k of Object.keys(MCIConfig.Initialisation)) {
    this.Initilisation[k] = ""
  }
  this.start_time = ""
  this.end_time = ""
  this.flight = ""
  this.test = ""
  this.S = []
  this.E = []
}
module.exports = MCISummary;