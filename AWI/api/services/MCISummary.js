var MCISummary = function () {
  for (let k of Object.keys(MCIConfig)) {
    this[k] = ""
  }
  this.Initilisation = []
  this.start_gmt = ""
  this.end_gmt = ""
}
module.exports = MCISummary;