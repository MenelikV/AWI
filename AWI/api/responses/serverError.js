/**
 * serverError.js
 *
 */

module.exports = function serverError(data, options){
  // Options is not undefined when an exception is thrown, TODO Handle Thrown Exceptions
  // Logging error to the console.
  if (data !== undefined) {
    sails.log.error('Sending 500 ("Server Error") response: \n', String(data));
  }  else {
    sails.log.error('Sending empty 500 ("Server Error") response');
  }

  this.res.status(500);
  return this.res.view("500", {activity: '', layout: 'layouts/home-layout'})
}

