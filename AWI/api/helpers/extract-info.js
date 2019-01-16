module.exports = {
  friendlyName: "extractInfos",
  description: "Extracting the MSN and Flight Number from MR name",
  sync: true,
  inputs: {
    name: {
      type: "str",
      required: true
    }
  },
  fn: function (inputs, exits) {
      const re = /[A-Z,a-z]\d{4,5}/g
      matches =  inputs.name.match(re)
      if(matches.length !== 2){
          exits.error(`Problem while parsing the name of the Meta Ressource ${inputs.name}`)
      }
      exits.success({AIRCRAFT: matches[0], TEST: matches[1]})
  }
}