/**
 *notFound.js
 *
 */

module.exports = function notFound(data, options){
    this.res.status(404);
    return this.res.view("404", {activity: '', layout: 'layouts/home-layout'})
} 