const inquirer = require("inquirer");
var fs = require('fs'),
    convertFactory = require('electron-html-to');
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile)

const questions = [
          {
            type: "input",
            name: "color",
            message: "What is your favorite color?"
          },
          {
            type: "input",
            name: "userName",
            message: "What is your Github username?"
          },
       ]

    
// }

function init() {
  inquirer.prompt(questions).then(function(dataReturnedFromPrompt){
        requestAPI(dataReturnedFromPrompt)
        // console.log(dataReturnedFromPrompt.color)
    })
}

function requestAPI(data){
    console.log(data)
    // create the api url with appropriate information
    const queryUrl = `https://api.github.com/users/${data.userName}`;

    axios.get(queryUrl).then(function(res) {
      console.log(res)
     


      fs.writeFile(`${data.userName}.html`, generateHTML(res, data), function(){
        console.log("success")
      })
});
}
init()

// CREATE PDF...??
// var fs = require('fs'),
//     convertFactory = require('electron-html-to');
// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });
// conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
//   if (err) {
//     return console.error(err);
//   }



