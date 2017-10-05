const program = require('commander');
const { generate } = require('./src/logic');

program
  .version('0.0.1')
  .description('Changelog generator');

program
  .command('generate <user> <password> <sprint>')
  .alias('g')
  .description('Generate changelo of a new version from a Sprint')
  .action((user, password, sprint) => {
    generate(user, password, sprint);
  });

program.parse(process.argv);