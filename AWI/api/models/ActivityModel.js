/**
 * Activity.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    activityName: {
      type: 'string',
      required: true
    },

    longName: {
      type: 'string',
    },

    AutoValCSVDirectory: {
      type: "string",
    },

    PVOLCSVDirectory: {
      type: 'string',
    },

    SummaryINFODirectory: {
      type: 'string',
    },

    discipline: {
      type: 'string'
    },

    AtoleCSVDirectory: {
      type: 'string'
    }

  },

};
