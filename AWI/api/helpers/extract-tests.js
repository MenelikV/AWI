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
      var path = require('path')
      var res = {}
      var dir = inputs.directory
      // Filters File to be sure we have the right expression (glob not powerful enough)
      inputs.files.forEach(async (f) => {
          var key = f
          f = path.join(dir, f)
          var test = new PBVTest()
          var content = fs.readFileSync(f).toString('utf-8');
          var tests = []
          var lines  = content.split("\n");
          for(let line of lines){
              if(line.indexOf("Type essai") === 0){
                if(test.isEmpty() === false){
                    tests.push(test)
                }
                test = new PBVTest()
                test.type = line.split(";")[1]
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
          res[key] = tests
      })
      exits.success(res)
    }
  }
  