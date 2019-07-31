module.exports = {
    friendlyName: "Extract Tests Info",
    description: "Extract Tests Info from PBV Atole File",
  
    inputs: {
      files: {
        type: "ref",
        required: true
      },
      directory: {
          type: "string",
          required: true
      }
    },
  
    exits: {
      success: {
  
      },
      error: {
  
      }
    },
  
    fn: async function check(inputs, exits) {
      var fs = require('fs')
      var res = {}
      var dir = inputs.directory
      inputs.file.forEach(async (f) => {
          var content = fs.readFile(f);
          var tests = []
          var lines  = content.split("\n");
          for(let line of lines){
              if("Type Essai" in line){
                if(test.isEmpty() === false){
                    tests.push(test)
                }
                test = PBVTest()
              }
              else{
                  // Filter out empty fields by default
                  var line_data = line.split(";").filter(d=>d.trim().length > 0);
                  if(line_data.length%2 !== 0){
                      // Do Nothing, this line is not correct
                      console.log(`${line} was not processed in file ${f}`)
                  }
                  else{
                    var i,j,temparray,chunk = 2;
                    for (i=0,j=line_data.length; i<j; i+=chunk) {
                        temparray = line_data.slice(i,i+chunk);
                        test[temparray[0]] = temparray[1]
                    }
                    
                  }

              }
          }
          var key = f.replace(dir, '')
          res[key] = tests
      })
      exits.success(res)
    }
  }
  