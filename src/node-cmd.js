const Promise = require('bluebird');
const cmd = require('node-cmd');

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

getAsync('git checkout master')
  .then(() => {
    console.log('Changed to master');
    getAsync('git pull')
  })
  .then(() => {
    console.log('Pulled from master');
    getAsync('git checkout development')
  })
  .then(() => {
    console.log('Changed to development');
    getAsync('git pull')
  })
  .then(console.log('Pulled from development'))
  .catch(err => {
    console.log('cmd err', err)
  })