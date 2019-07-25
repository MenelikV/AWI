/**
 * Color.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        activity: {
            required: true,
            type: "string"
        },
        aircraft: {
            required: true,
            type: "string"
        },
        color: {
            required: true,
            type: "string"
        },
        filename: {
            required: true,
            type: "string"
        },
        parameters: {
            collection: 'parameter',
            via: 'source'
        }
    }
}