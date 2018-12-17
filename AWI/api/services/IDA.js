/* Imports */
const request = require("request").defaults({
  jar: true,
  forever: true
})
const fs = require("fs")

/* Class Definition */
var IDADataManager = function () {
  var pwd = "dYHDhnP+2zisJrYZkH5QzKS/SQIZNhlVyc4VG4LJ/OVDTcIf7a9Vu9xGcXP13Zazseh7mOmcmC7XI8mtQ+FxJAgP082YiculC8s4LGHnpY7fqB0hqjo5ZE6ZEJsLNO4CKJYutWHr5jNPMvcxsYua/0AeBoklhougZtdxPI/rZPKhvOs7UdJVkVqtP0YZmclI3eWQzIR5ROhrGIQILFbc2hko0nMB/st/BLj0sxmkGbmHv7rkGtfV7NJ8vZq3MMgaY/PqiRrCd0a9kgqkwor58d80P4b6FiPQaP2B/wJ6g6mXWlNdfzeTCSJm8Glai4JsXq0NBockXJdGSDoWBXE1hg=="
  this.user = "SA-R970-SHIFT";
  this.id = "ng5f370";
  this.mode = "GMT_DATE";
  this.pwd = pwd
  this.mr_register = {};
  this.OpenSessionSecured();
}
IDADataManager.url = "http://ida-r970.eu.airbus.corp:8970/isx-servlet/IdaServlet"
IDADataManager.prototype.OpenSessionSecured = async function () {
  let res = await this.doRequest({
    msg: "OpenSessionSecured",
    user: this.user,
    id: this.id,
    pwd: this.pwd
  })
}
IDADataManager.prototype.CloseMR = async function (mr_adress) {
  var mr_id = await this.getMRID(mr_adress)
  let res = await this.doRequest({
    msg: "CloseMR",
    key: mr_id
  })
  delete this.mr_register[mr_adress]
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
  let res = await this.doRequest({
    msg: "CloseSession"
  })
  this.mr_register = {}
}
IDADataManager.prototype.OpenMR = async function (mr_adress) {
  let mr_id = await this.doRequest({
    msg: "OpenMR",
    name: mr_adress
  })
  if (mr_id === undefined) {
    throw MRLoading("IDA Does not manage to open the MetaRessource " + mr_adress)
  } else {
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
      start: startt,
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
  let data = []
  var res = await this.ReadParamsSamplesSampling(mr_adress, startt, endt, params)
  while (this.validate(res)) {
    data.push(res)
    var res = await this.ReadParamsSamplesNext(mr_adress)
  }
  data = Buffer.concat(data)
  return data
}
IDADataManager.prototype.doRequest = function (form, encoding) {
  if (encoding === undefined) {
    var enc = "utf8"
  } else {
    var enc = encoding
  }
  console.log(form)
  return new Promise(function (resolve, reject) {
    request.post({
      url: IDADataManager.url,
      form: form,
      encoding: enc
    }, function (err, res) {
      console.log(res.headers)
      if (!err && res.statusCode === 200) {
        resolve(res.body)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = IDADataManager