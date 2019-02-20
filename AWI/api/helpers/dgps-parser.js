module.exports = {
  friendlyName: "DGPS Summary Parser",
  description: "Extracting info about the flight and the summary",
  sync: true,
  inputs: {
    name: {
      type: "str",
      description: "absolute file path of the file to be parsed",
      required: true
    }
  },
  fn: function (inputs, exits) {
    const _types_expected = {
      "MR_DGPS": String,
      "Station_Used": Array,
      "Date_Test": String,
      "GMT_Deb": String,
      "GMT_Fin": String,
      "Runways_used": Array,
      "GMT_RWY_deb": Array,
      "GMT_RWY_fin": Array,
      "GMT_GENE_deb": Array,
      "GMT_GENE_fin": Array,
      "Profils": Array,
      "OPT_DHP": Array,
      "OPT_DVTP": Array,
      "OPT_DZRA": Array,
      "OPT_HRA": Array,
      "OPT_RWYDH": Array,
      "OPT_SPD": Array,
      "Runways_PVOL": Array,
      "GMT_PVOL_deb": Array,
      "GMT_PVOL_fin": Array,
      "LOM_Piste": String,
      "LOM_Profil": String
    }
    var res = {}
    const fs = require("fs")
    var content = fs.readFileSync(inputs.name, "utf8")
    var array = content.split("\n")
    for (let line of array) {
      matches = line.match(/#[A-Z][A-Z,a-z,_]*/g)
      if (matches !== null && matches.length === 1) {
        var to_replace = matches[0]
        // Ignoring the beginning character
        var field = matches[0].slice(1)
        var values = line.replace(to_replace, "").trim(/\s/gm)
        var values_parts = values.split(/\s+/)
        if (!values_parts.length) {
          console.log(`Field ${field}  was not parsed correctly`)
        }
        switch (_.get(_types_expected, field, String)) {
          case Array:
            res[field] = values_parts
            break
          case String:
            res[field] = values
            break
          default:
            res[field] = values
            break
        }
      }
    }

    exits.success(res)
  }
}