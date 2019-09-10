/* Imports */
const request_module = require("request")
var cookie = request_module.jar()
request = request_module.defaults({
  jar: cookie,
  forever: true
})
const moment = require("moment")
const Proto = require("./Proto")
const numeral = require("numeral")
const os = require("os")
const M = 1000000
const DAY = 24 * 60 * 60
// Inspired from https://stackoverflow.com/questions/5072136/javascript-filter-for-objects
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
// FIXME create a local cache for future reloading of the page
/* Class Definition */
var IDADataManager = function () {
  var pwd = "dYHDhnP+2zisJrYZkH5QzKS/SQIZNhlVyc4VG4LJ/OVDTcIf7a9Vu9xGcXP13Zazseh7mOmcmC7XI8mtQ+FxJAgP082YiculC8s4LGHnpY7fqB0hqjo5ZE6ZEJsLNO4CKJYutWHr5jNPMvcxsYua/0AeBoklhougZtdxPI/rZPKhvOs7UdJVkVqtP0YZmclI3eWQzIR5ROhrGIQILFbc2hko0nMB/st/BLj0sxmkGbmHv7rkGtfV7NJ8vZq3MMgaY/PqiRrCd0a9kgqkwor58d80P4b6FiPQaP2B/wJ6g6mXWlNdfzeTCSJm8Glai4JsXq0NBockXJdGSDoWBXE1hg=="
  this.user = "SA-R970-SHIFT";
  this.id = os.userInfo().username.match(/[st, ng]{2}\w+\d+/gm) ?  os.userInfo().username : "ng5f370";
  this.mode = "GMT_DATE";
  this.pwd = pwd
  this.mr_register = {};
  this.times_register = {};
  this.skipped = {}
}
IDADataManager.url = "http://ida-r970.eu.airbus.corp:8970/isx-servlet/IdaServlet"
IDADataManager.prototype.OpenSessionSecured = async function () {
  // TODO If it fails, go through the non Secured Option
  // It that fails raise an error to the user
  try{
    let res = await this.doRequest({
      msg: "OpenSessionSecured",
      user: this.user,
      id: this.id,
      pwd: this.pwd
    }, undefined, true)
    return res
  }
  catch(error){
    if(error === "User not authenticated. session no longer valid"){
      var cookie = request_module.jar()
      request = request_module.defaults({
        forever:true,
        jar: cookie
      })
    }
    await this.CloseSession()
    try{
      let res = await this.doRequest({
        msg: "OpenSessionSecured",
        user: this.user,
        id: this.id,
        pwd: this.pwd
      }, undefined, true)
      return res
    }
    catch(error){
      await this.OpenSession()
    }
  }
}
IDADataManager.prototype.OpenSession = async function(){
  await this.doRequest({
    msg: "OpenSession",
    user: this.id
  })
}
IDADataManager.prototype.CloseMR = async function (mr_adress) {
  var mr_id = await this.getMRID(mr_adress)
  await this.doRequest({
    msg: "CloseRes",
    key: mr_id
  })
  delete this.mr_register[mr_adress]
  delete this.times_register[mr_adress]
  delete this.skipped[mr_adress]
}
IDADataManager.prototype.getMRID = async function (mr_adress) {
  var cached_id = this.mr_register[mr_adress]
  if (cached_id !== undefined) {
    return cached_id
  } else {
    // Try to Open the MR
    let res = await this.OpenMR(mr_adress)
    // Try to catch & handle error here
    this.mr_register[mr_adress] = res
    return res
  }

}
IDADataManager.prototype.CloseSession = async function () {
  // TODO Close All MR before before closing Session ?
  await this.doRequest({
    msg: "CloseSession"
  })
  this.mr_register = {}
  this.times_register = {}
  this.skipped = {}
}
IDADataManager.prototype.OpenMR = async function (mr_adress) {
  try{
    let mr_id = await this.doRequest({
      msg: "OpenMR",
      name: mr_adress
    }, undefined, true)
    this.mr_register[mr_adress] = mr_id.replace(/\D/g, '')
    this.skipped[mr_adress] = {}
    return mr_id
  }
  catch(error){
    // Reconnect and redo once
    await this.OpenSessionSecured()
    let mr_id = await this.doRequest({
      msg: "OpenMR",
      name: mr_adress
    })
    this.mr_register[mr_adress] = mr_id.replace(/\D/g, '')
    this.skipped[mr_adress] = {}
    return mr_id
  }
}
IDADataManager.prototype.GetParamsInfo = async function (mr_adress, params) {
  let mr_id = await this.getMRID(mr_adress)
  let res = await this.doRequest({
    msg: "GetParamsInfo",
    key: mr_id,
    list: params.join("~")
  })

}
IDADataManager.prototype.GetMRTimes = async function(mr_adress, format){
  if(this.times_register[mr_adress] !== undefined){
    if(this.times_register[mr_adress].length == 2){
      // Fetch Dat From Cache
      if(format !== undefined){return this.times_register[mr_adress].map(d => d.format(format))}
      return this.times_register[mr_adress].map(d=>d.clone())
    }
    else{
      // Invalid Cache, force update
      this.times_register[mr_adress] = undefined
      return await this.GetMRTimes(mr_adress, format)
    }
  }
  let mr_id = await this.getMRID(mr_adress)
  let res = await this.doRequest({
    msg: "GetResourceTimeIntervalList",
    key: mr_id
  })
  var input_format = "DDD-HH:mm:ss"
  // Remove the last element
  var times = res.split(" | ")
  times.pop()
  if(times.length >= 2){
    // Sevreal timezones detected
    times = times.map(t => moment(t.split("§").pop(), input_format))
    times.sort((a, b) => a - b)
    var start = times.shift()
    var end = times.pop()
    times = [start, end]
  }
  // Convert to Moment Object
  times.forEach((o, i, a) => a[i] = moment(a[i], input_format))
  this.times_register[mr_adress] = times.map(d => d.clone())
  // Convert back to String using moment format
  if(format !== undefined){
  times.forEach((o, i, a) => a[i] = a[i].format(format))
}
  return times
}
IDADataManager.prototype.ReadAllSamples = async function (mr_adress, startt, endt, params) {
  var mr_id = await this.getMRID(mr_adress)
  if (mr_id === undefined) {
    return undefined
  } else {
    return this.doRequest({
      key: mr_id,
      startt: startt,
      endt: endt,
      list: params.join("~"),
      mode: this.mode,
      msg: "ReadAllSamples"
    }, null)
  }
}
IDADataManager.prototype.ReadParamsSamplesSampling = async function (mr_adress, startt, endt, params, rate) {
  var mr_id = await this.getMRID(mr_adress)
  if(rate !== undefined){
    var rate = String(rate)
  }
  else{
    var rate = "10"
  }
  if (mr_id === undefined) {
    return undefined
  } else {
    return this.doRequest({
      key: mr_id,
      startt: startt,
      endt: endt,
      rate: rate,
      list: params.join("~"),
      mode: this.mode,
      msg: "ReadParamsSamplesSampling"
    }, null)
  }
}
IDADataManager.prototype.ReadParamsSamplesTopana = async function(mr_adress, startt, endt, params, refs){
  var mr_id = await this.getMRID(mr_adress)
  if(mr_id === undefined){
    return undefined
  }
  else{
    return this.doRequest({
      msg: "ReadParamsSamplesTopana",
      key: mr_id,
      startt: startt,
      endt: endt,
      list: params.join("~"),
      datalist: refs.join("~")
    }, null)
  }
}
IDADataManager.prototype.ReadParamsSamplesDataList = async function(mr_adress, startt, endt, params, refs){
  var mr_id = await this.getMRID(mr_adress)
  if(mr_id === undefined){
    return undefined
  }
  else{
    return this.doRequest({
      msg: "ReadParamsSamplesDataList",
      key: mr_id,
      startt: startt,
      endt: endt,
      mode: this.mode,
      list: params.join("~"),
      datalist: refs.join("~")
    }, null)
  }
}
IDADataManager.prototype.ReadParamsSamplesNext = async function (mr_adress) {
  let mr_id = await this.getMRID(mr_adress)
  return this.doRequest({
    msg: "ReadParamsSamplesNext",
    key: mr_id
  }, null)
}
IDADataManager.prototype.validate = function (res) {
  return _.get(res, 'length', 0)
}
IDADataManager.prototype.ReadPlotData = async function (mr_adress, startt, endt, params, rate) {
  // TODO Cache it ?
  rate = (typeof rate === 'undefined') ? 1 : rate;
  let data = []
  var res = await this.ReadParamsSamplesSampling(mr_adress, startt, endt, params, rate)
  while (this.validate(res)) {
    data.push(res)
    var res = await this.ReadParamsSamplesNext(mr_adress)
  }
  data = Buffer.concat(data)
  // TODO Protobuf Decoding of the data
  var res = Proto.MULTI_PARAM_SAMPLES_PERGMT_DATE.decode(data)
  var list = res.listParamSamplesPerGmtDate
  var final_res = {}
  if(!list.length){
    // No Valid Data
    console.log("No valid Data!")
    for(let key of params){
      final_res[key] = [{x: [], y: []}]
    }
    return final_res
  }
  else{
      for(let [index, par] of params.entries()){
        var i = 0;
        final_res[par] = {x: new Array(list.length), y: new Array(list.length)};
        while(i<list.length){
          final_res[par].x[i] = new Date(list[i].listParamSamples.listParamSample[index].objGmt.longGmtDate/1000)
          final_res[par].y[i] = list[i].listParamSamples.listParamSample[index].objValue.dblValueType
          i++;
        }
      }
      return final_res
  }
}
IDADataManager.prototype.ReadSummaryData = async function (mr_adress, startt, endt, params, type, refs){
  var type = type || []
  var refs = refs || []
  if(refs.length){
    // Triggered Read
    var data = []
    var res = await this.ReadParamsSamplesDataList(mr_adress, startt, endt, params, refs)
    while (this.validate(res)) {
      data.push(res)
      var res = await this.ReadParamsSamplesNext(mr_adress)
    }
    data = Buffer.concat(data)
  }
  else{
    var data = await this.ReadParamsSamplesSampling(mr_adress, startt, endt, params)
  } 
  var res = Proto.MULTI_PARAM_SAMPLES_PERGMT_DATE.decode(data)
  var list = res.listParamSamplesPerGmtDate
  var final_res = {}
  if(!list.length){
    console.log("No valid Data!")
    for(let key of params){
      final_res[key] = ""
    }
    return final_res
  }
  else{
    var root = list[0].listParamSamples
    if(!type.length){
      for(let [index, par] of params.entries()){
        final_res[par] = root.listParamSample[index].objValue.dblValueType
      }
      return final_res
    }
    else{
      for(let [index, par] of params.entries()){
        switch(type[index]){
          case "string":
            var key = "bufValueType"
            var post = d => d.toString("utf8")
            break;
          case "float":
            var key = "dblValueType"
            var post = d => d
            break;
          default:
            var key = "dblValueType"
            var post = d => d
            break;
        }
        final_res[par] = post(root.listParamSample[index].objValue[key])
      }
      return final_res
    }
  }
}
IDADataManager.prototype.FetchParameters = async function(mr_adress, config, msn){
  var times = await this.GetMRTimes(mr_adress)
  var startt = times[0]
  var endt = times[1]
  var internal_format = "HH:mm:ss"
  // TODO Add a flilter for strings ?
  if(msn !== undefined){
  var code = MSNConfig.Mapping[msn]
  if(code !== undefined){
    config = Object.filter(config, d=>d.allowedMSN === undefined || d.allowedMSN.indexOf(code) !== -1)
  }
else{
  console.error(`Unknow MSN ${msn}`)
}}
  const conf_minus = Object.filter(config, d => d.time.minutes === -1)
  const conf_plus = Object.filter(config, d => d.time.minutes === 1)
  // This assumes the flight test lasts at least one hour
  var later_start = startt.clone().add({hours: 2}).format(internal_format)
  var _s = endt.clone().add({minutes: -1}).format(internal_format)
  var _e = moment(_s, internal_format).add({seconds: 1}).format(internal_format)
  var id_minus = []
  var type_minus = []
  for(let k of Object.keys(conf_minus)){
    id_minus.push(conf_minus[k].id)
    type_minus.push(conf_minus[k].type)
    var ref_minus = conf_minus[k].refs
  }
  // Assuming the ref is the same for every fetched parameters
  type_minus = _.isEqual(type_minus, Array(type_minus.length)) ? []: type_minus
  if(id_minus.length){
    if(_.get(ref_minus, 'length', 0) > 0){
      var res_minus = await this.ReadSummaryData(mr_adress, startt.format(internal_format), later_start, id_minus, type_minus, ref_minus)
    }else{
      var res_minus = await this.ReadSummaryData(mr_adress, _s, _e, id_minus, type_minus)
    }
    
  }
  else{
    var res_minus = {}
  }
  var _s = startt.clone().add({minutes: 1}).format(internal_format)
  var _e = moment(_s, internal_format).add({seconds: 1}).format(internal_format)
  var id_plus = []
  var type_plus = []
  for(let k of Object.keys(conf_plus)){
    id_plus.push(conf_plus[k].id)
    type_plus.push(conf_plus[k].type)
    var ref_plus = conf_plus[k].refs
  }
  type_plus = _.isEqual(type_plus, Array(type_plus.length)) ? []: type_plus
  if(id_plus.length){
    if(_.get(res_plus, 'length', 0) > 0){
      var res_plus = await this.ReadSummaryData(mr_adress, startt.format(internal_format), later_start, id_plus, type_plus, ref_plus)
    }
    else{
      var res_plus =  await this.ReadSummaryData(mr_adress, _s, _e, id_plus, type_plus)
    }
  }
  else{
    var res_plus = {}
  }
  var res = {...res_plus, ...res_minus}
  var config_res = {}
  for(let key of Object.keys(config)){
    if(config[key].id !== undefined){
      config_res[key] = res[config[key].id]
    }
    else{
      config_res[key] = res[key]
    }
  }
  // Take care of Formatting
  for(let key of Object.keys(config)){
    if(config[key].format !== undefined && config_res[key] !== undefined){
      config_res[key] = numeral(config_res[key]).format(config[key].format, d=>Math.floor(d))
    }
  }
  return config_res
}
IDADataManager.prototype.FetchParametersOverridenTime = async function(mr_adress, config, msn, time){
  var internal_format = "HH:mm:ss"
  if (msn !== undefined) {
    var code = MSNConfig.Mapping[msn]
    if (code !== undefined) {
      config = Object.filter(config, d => d.allowedMSN === undefined || d.allowedMSN.indexOf(code) !== -1)
    } else {
      console.error(`Unknow MSN ${msn}`)
    }
  }
  var _e = moment(time, internal_format).add({seconds: 1}).format(internal_format)
  var ids = []
  for(let k of Object.keys(config)){
    ids.push(config[k].id)
  }
  var res = await this.ReadSummaryData(mr_adress, time, _e, ids)
  var config_res = {}
  for(let key of Object.keys(config)){
    if(config[key].id !== undefined){
      config_res[key] = res[config[key].id]
    }
    else{
      config_res[key] = res[key]
    }
  }
    // Take care of Formatting
    for(let key of Object.keys(config)){
      if(config[key].format !== undefined && config_res[key] !== undefined){
        config_res[key] = numeral(config_res[key]).format(config[key].format, d=>Math.floor(d))
      }
    }
  return config_res
}
IDADataManager.prototype.FetchParametersPBV = async function(mr_adress, config, msn, type) {
  var times = await this.GetMRTimes(mr_adress)
  var startt = times[0]
  var conf_plus = config
  var internal_format = "HH:mm:ss"
  var _s = startt.clone().format(internal_format)
  var later_start = startt.clone().add({hours: 1}).format(internal_format)
  var id_plus = []
  var type_plus = []
  var ref_plus;
  for(let k of Object.keys(conf_plus)){
    if(typeof conf_plus[k].id === "string"){
      id_plus.push(conf_plus[k].id)
      type_plus.push(conf_plus[k].type)
      ref_plus = conf_plus[k].refs[type]
    }
    else{
      try{
        if(conf_plus[k].id[msn] !== undefined){
          id_plus.push(conf_plus[k].id[msn])
          type_plus.push(conf_plus[k].type)
          ref_plus = conf_plus[k].refs[type]
        }
      }
      catch(error){
        // Do nothing here
      }

    }
  }
  var res =  await this.ReadSummaryData(mr_adress, _s, later_start, id_plus, type_plus, ref_plus)
  var config_res = {}
  for(let key of Object.keys(config)){
    if(typeof conf_plus[key].id === "string"){
      config_res[key] = res[config[key].id]
    }
    else{
      // TODO Switch case here ?
      if(res[conf_plus[key].id[msn]] !== undefined){
        config_res[key] = res[conf_plus[key].id[msn]]
      }
    }
  }
    // Take care of Formatting
    for(let key of Object.keys(config)){
      if(config[key].format !== undefined && config_res[key] !== undefined){
        config_res[key] = numeral(config_res[key]).format(config[key].format, d=>Math.floor(d))
      }
    }
  return config_res
}
IDADataManager.prototype.doRequest = function (form, encoding, ex) {
  var exception_rejected = ex || false
  // Encoding should be `null` for request which require a binary response
  var enc = encoding === undefined ? "utf8": encoding
  return new Promise(function (resolve, reject) {
    request.post({
      url: IDADataManager.url,
      form: form,
      encoding: enc
    }, function (err, res) {
      if(res === undefined){
        reject(err)
        return
      }
      console.log(res.headers)
      if (!err && res.statusCode === 200) {
        if(exception_rejected){
          if(res.headers.x_isx_status_code.startsWith("E")){
            reject(res.headers.x_isx_status_message)
          }
        }
        resolve(res.body)
      } else {
        console.error(err)
        reject(err)
      }
    })
  })
}

module.exports = IDADataManager