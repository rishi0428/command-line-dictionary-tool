const readline = require('readline');

const routes                = require('./routes/routes');
const {GAME_STATE, MESSAGE} = require('./properties/constants');

// creating a command line interface for interaction with user
let inputInterface = readline.createInterface({
  input : process.stdin,
  output: process.stdout,
  prompt: 'DICT> '
});

console.log(MESSAGE.STARTUP_MESSAGE);
inputInterface.prompt();

inputInterface.on('line', async (line) => {
  if(line == "exit"){
    inputInterface.close();
    return;
  }
  await routes.route(line.trim(), GAME_STATE);
  inputInterface.prompt();
});

inputInterface.on('SIGINT', () => {
  inputInterface.question('Are you sure you want to exit app? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) inputInterface.pause();
  });
});