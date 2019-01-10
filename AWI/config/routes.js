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

  'POST /Activities/DGPS/search': 'activities/DGPSController.search',

  'GET /Activities/DGPS/flights': { 
    view: 'pages/Activities/DGPS/flights',
    controller: 'Activities/DGPSController',
    action: 'getInfo' },
 
    'GET /Activities/MCI/flights': { 
      view: 'pages/Activities/MCI/flights',
      controller: 'Activities/MCIController',
      action: 'getInfo'},

  'GET /Activities/DGPS/flightOverview/:id': 'Activities/DGPSController.getFlightOverview',

  'GET /Activities/MCI/flightOverview/:id': 'Activities/MCIController.getFlightOverview',

  'GET /Activites/DGPS/flightOverview/:id/plot': 'PlotController.plot',

  'GET /Activities/MCI/flightOverview/:id/plot': 'PlotController.plot',



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
