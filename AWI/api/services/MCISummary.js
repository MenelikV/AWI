var MCISummary = function () {
  this.Initilisation = {}
  for (let k of Object.keys(MCIConfig)) {
    this.Initilisation[k] = ""
  }
  this.start_gmt = ""
  this.end_gmt = ""
}
module.exports = MCISummary;