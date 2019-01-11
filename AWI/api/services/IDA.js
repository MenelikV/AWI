/* Imports */
const request = require("request").defaults({
  jar: true,
  forever: true
})
const moment = require("moment")
const Proto = require("./Proto")
const M = 1000000
const DAY = 24 * 60 * 60

/* Class Definition */
var IDADataManager = function () {
  var pwd = "dYHDhnP+2zisJrYZkH5QzKS/SQIZNhlVyc4VG4LJ/OVDTcIf7a9Vu9xGcXP13Zazseh7mOmcmC7XI8mtQ+FxJAgP082YiculC8s4LGHnpY7fqB0hqjo5ZE6ZEJsLNO4CKJYutWHr5jNPMvcxsYua/0AeBoklhougZtdxPI/rZPKhvOs7UdJVkVqtP0YZmclI3eWQzIR5ROhrGIQILFbc2hko0nMB/st/BLj0sxmkGbmHv7rkGtfV7NJ8vZq3MMgaY/PqiRrCd0a9kgqkwor58d80P4b6FiPQaP2B/wJ6g6mXWlNdfzeTCSJm8Glai4JsXq0NBockXJdGSDoWBXE1hg=="
  this.user = "SA-R970-SHIFT";
  this.id = "ng5f370";
  this.mode = "GMT_DATE";
  this.pwd = pwd
  this.mr_register = {};
  this.times_register = {};
}
IDADataManager.url = "http://ida-r970.eu.airbus.corp:8970/isx-servlet/IdaServlet"
IDADataManager.prototype.OpenSessionSecured = async function () {
  // TODO If it fails, go through the non Secured Option
  // It that fails raise an error to the user
  let res = await this.doRequest({
    msg: "OpenSessionSecured",
    user: this.user,
    id: this.id,
    pwd: this.pwd
  })
  return res
}
IDADataManager.prototype.CloseMR = async function (mr_adress) {
  var mr_id = await this.getMRID(mr_adress)
  await this.doRequest({
    msg: "CloseRes",
    key: mr_id
  })
  delete this.mr_register[mr_adress]
  delete this.times_register[mr_adress]
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
}
IDADataManager.prototype.OpenMR = async function (mr_adress) {
  let mr_id = await this.doRequest({
    msg: "OpenMR",
    name: mr_adress
  })
  if (mr_id === undefined) {
    console.log("Problem with IDA")
    throw MRLoading("IDA Does not manage to open the MetaRessource " + mr_adress)
  } else {
    console.log("IDA openened the MR with sucess")
    this.mr_register[mr_adress] = mr_id.replace(/\D/g, '')
    console.log(mr_id)
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
    // Fetch Dat From Cache
    if(format !== undefined){return this.times_register[mr_adress].map(d => d.format(format))}
    return this.times_register[mr_adress]
  }
  let mr_id = await this.getMRID(mr_adress)
  let res = await this.doRequest({
    msg: "GetResourceTimeIntervalList",
    key: mr_id
  })
  // Remove the last element
  var times = res.split(" | ")
  times.pop()
  var input_format = "DDD-HH:mm:ss"
  // Convert to Moment Object
  times.forEach((o, i, a) => a[i] = moment(a[i], input_format))
  this.times_register[mr_adress] = times
  // Convert back to String using moment format
  if(format !== undefined){
  times.forEach((o, i, a) => a[i] = a[i].format(ouput_format))
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
IDADataManager.prototype.ReadParamsSamplesSampling = async function (mr_adress, startt, endt, params) {
  var mr_id = await this.getMRID(mr_adress)
  if (mr_id === undefined) {
    return undefined
  } else {
    return this.doRequest({
      key: mr_id,
      startt: startt,
      endt: endt,
      rate: "10",
      list: params.join("~"),
      mode: this.mode,
      msg: "ReadParamsSamplesSampling"
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
  if (res === undefined) {
    return false
  } else {
    if (typeof (res) === "object") {
      if (res.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
IDADataManager.prototype.ReadData = async function (mr_adress, startt, endt, params) {
  // TODO Cache it ?
  let data = []
  var res = await this.ReadParamsSamplesSampling(mr_adress, startt, endt, params)
  while (this.validate(res)) {
    data.push(res)
    var res = await this.ReadParamsSamplesNext(mr_adress)
  }
  data = Buffer.concat(data)
  // TODO Protobuf Decoding of the data
  var res = Proto.MULTI_PARAM_SAMPLES_PERGMT_DATE.decode(data)
  var list = res.listParamSamplesPerGmtDate
  if(!list.length){
    // No Valid Data
    console.log("No valid Data!")
    return {time: [], value: []}
  }
  else{
    var times = list.map(d=>moment.unix((d.objGmt.longGmtDate/M)%DAY).utc().format("HH:mm:ss.SSS"))
    var values = list.map(d=>sails.helpers.numberFormat(d.listParamSamples.listParamSample[0].objValue.dblValueType))
    return {time: times, value: values}
  }

}
IDADataManager.prototype.ReadParametersOnTime = async function(mr_adress, time, params){
  
}
IDADataManager.prototype.FetchParameters = async function(mr_adress, config){
  mr_id = this.getMRID(mr_adress)
  var times = await this.GetMRTimes(mr_adress)
  var startt = times[0]
  var endt = times[1]
  var internal_format = "HH:mm:ss"
  res = {}
  for(let key of Object.keys(config)){
    if(config[key].time.minutes < 0){
      var _s = startt.add(config[key].time).format(internal_format)
      var _e = endt.add({seconds: -59}).format(internal_format)
    }
    else{
      var _e = startt.add(config[key].time).format(internal_format)
      var _s = endt.add({seconds: 59}).format(internal_format)
    }
    var data = await this.ReadData(mr_adress, _s, _e, [config[key].id])
    //res[key] = numeral(data).format(config[key].format)
    res[key] = data
  }
  return res
}
IDADataManager.prototype.doRequest = function (form, encoding) {
  // TODO Check Server Status Message and Raise an Error
  if (encoding === undefined) {
    var enc = "utf8"
  } else {
    var enc = encoding
  }
  //console.log(form)
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
        resolve(res.body)
      } else {
        console.error(err)
        reject(err)
      }
    })
  })
}

module.exports = IDADataManager