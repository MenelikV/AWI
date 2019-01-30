module.exports = {

  inputs: {
    activityName: {
      type: 'string'
    },
    setting: {
      type: 'string'
    }
  },

  fn: async function (inputs, exits) {
    var result = await ActivityModel.find({activityName: inputs.activityName})
    result = result[0][inputs.setting]
    return exits.success(result)
  }

}
