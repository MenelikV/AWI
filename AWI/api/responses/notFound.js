module.exports = function notFound(data, options){
    options = options || {}
    var activity = options.activity || "DGPS"
    this.res.status(404);
    return this.res.view("404", {me: this.req.me, activity: activity, error: data})
}