/**
 * Filter.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    

    activity: {
      type: 'string',
      required: true
    },

    aircraft: {
      type: "string",
      required: true
    },

    type: {
      type: 'string',
      required: true
    },

    test: {
        type: 'string',
        required: true
      },

    
  },

};
