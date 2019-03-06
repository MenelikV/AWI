/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  'GET /': {

    view: 'pages/home',

    locals: {
      layout: 'layouts/home-layout'
    }
  },

  'GET /Activities/DGPS/flights': {
    view: 'pages/Activities/DGPS/flights',
    controller: 'Activities/DGPSController',
    action: 'getInfo'
  },

  'GET /Activities/MCI/flights': {
    view: 'pages/Activities/MCI/flights',
    controller: 'Activities/MCIController',
    action: 'getInfo'
  },

  'GET /Activities/ANEMO/flights': {
    view: 'pages/Activities/ANEMO/flights',
    controller: 'Activities/ANEMOController',
    action: 'getInfo'
  },

  'GET /Activities/DGPS/flightOverview/:id': 'Activities/DGPSController.getFlightOverview',

  'GET /Activities/MCI/flightOverview/:id': 'Activities/MCIController.getFlightOverview',

  'POST /Activities/MCI/flightOverview/:id/update': 'Activities/MCIController.updateFlightOverview',

  'GET /Activities/ANEMO/flightOverview/:id': 'Activities/ANEMOController.getFlightOverview',


  'POST /createFilter/:id': 'FilterController.createFilter',

  'POST /deleteFilter/:id': 'FilterController.deleteFilter',

  'GET /Activities/:id/filterSettings': 'FilterController.getFilters',
  

  'POST /Activities/:activity/search': 'SearchController.search',


  'GET /Settings/:id': 'SettingsController.getSettings',

  'POST /Settings/changeSettings': 'SettingsController.changeSettings',


  'GET /Activities/flightOverview/plot': 'PlotController.plot',

  'GET /Activities/flightOverview/plot': 'PlotController.plot',


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};
