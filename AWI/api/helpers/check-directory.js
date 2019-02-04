module.exports = {
  friendlyName: "Check Directory",
  description: "Check if directory exists and has only csv files",

  inputs: {
    directory: {
      type: "str",
      required: true
    }
  },

  exits: {
    success: {

    },
    error: {

    }
  },

  fn: async function check(inputs,exits) {
    var fs = require('fs')
    var path = require('path')
    var files;
    try {
      files = fs.readdirSync(inputs.directory)
    } catch (err){
      if (err){
        return exits.error(err)
      }
    }
    
    for (let i = 0; i < files.length; i++) {
      var stats = fs.statSync(path.join(inputs.directory, files[i]))
      if (!stats.isFile || !files[i].includes(".csv")) {
        return exits.error(err)
      }
    }
    return exits.success()
  }
}
