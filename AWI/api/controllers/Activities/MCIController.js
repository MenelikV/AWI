/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    getInfo: async function (req, res) {

        return res.view("pages/Activities/MCI/flights", { activity: 'MCI' })
    }

}