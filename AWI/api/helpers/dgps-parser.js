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
        var res = {}
        const fs = require("fs")
        var content = fs.readFileSync(inputs.name, "utf8")
        var array = content.split("\n")
        for(let line of array){
        matches = line.match(/#[A-Z][A-Z,a-z,_]*/g)
        if(matches !== null && matches.length === 1){
            var to_replace = matches[0]
            // Ignoring the beginning character
            var field = matches[0].slice(1)
            var values = line.replace(to_replace, "").trim(/\s/gm)
            var values_parts = values.split(/\s+/)
            if(values_parts.length > 1){
                res[field] = values_parts
            }
            else{
                if(values_parts.length === 1){
                    res[field] = values
                }
                else{
                    console.log(`${field} was not parsed correctly`)
                }
            }
            }
        }

        exits.success(res)
    }
}