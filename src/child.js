var Promise = require('bluebird');
var exec = require('child_process').exec;
const package = require('../package.json');

exec('git checkout master', (error, stdout, stderr) => {
  console.log(error);
  console.log(stdout);
  console.log(stderr);

  exec('git pull master', (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  
    exec('git checkout development', (error, stdout, stderr) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    
      exec('git pull development', (error, stdout, stderr) => {
        console.log(error);
        console.log(stdout);
        console.log(stderr);

        const version = parseFloat(package.version);
        const nextVersion = version + 0.1;
      
        exec('git checkout -b release/v' + nextVersion, (error, stdout, stderr) => {
          console.log(error);
          console.log(stdout);
          console.log(stderr);
          
        })
      })
    })
  })
})