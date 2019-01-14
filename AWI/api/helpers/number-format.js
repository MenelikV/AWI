const numeral = require('numeral')
/*
Register New Format 
*/
numeral.register('format', 'vincent', {
  regexps: {
    format: '6V',
  },
  format: function(value, format, roundingFunction){
      var val_abs = Math.abs(value)
    if(val_abs > 1000000 || val_abs < 0.000001){
        return numeral._.numberToFormat(value, "0a", roundingFunction)
    }
    else{
        //console.debug(`Value used for conversion ${value}`)
        output = numeral._.toFixed(value, 6, roundingFunction)
        //console.debug(`Observed output ${output}`)
        return output
    }
  },
})
module.exports = {
  friendlyName: "numberFormat",
  description: "Formatting number, the Guettet's Way, having max 6 numbers displayed anyway",
  sync: true,
  inputs: {
    number: {
      type: "str",
      required: false
    }
  },
  fn: function (inputs, exits) {
    try{
    exits.success(numeral(inputs.number).format("6V"))}
    catch(error){
      exits.sucess("")
    }
  }
}