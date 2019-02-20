module.exports = {
  friendlyName: "Phases Patcher",
  description: "Add a FLIGHT Phase after each TO and TG",

  inputs: {
    initialPhasesList: {
      type: "ref",
      required: true
    }
  },
  
  sync: true,

  fn: function check(inputs, exits) {
    var list = inputs.initialPhasesList
    var new_list = []
    for (let [idx, p] of list.entries()) {
      new_list.push(p)
      if (p["PHASE"] === "TG" || p["PHASE"] === "TO") {
        if (list[idx + 1] !== undefined) {
          var patch = {}
          patch["END"] = list[idx + 1]["START"]
          patch["PHASE"] = "FLIGHT"
          patch["START"] = p["END"]
          new_list.push(patch)
        } else {
          console.error("Problem occured while patching phases")
        }
      }
    }
    exits.success(new_list)
  }
}