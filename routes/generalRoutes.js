// local imports
const generalFeatures = require('./../controllers/generalFeatures.js');
const gameFeatures    = require('./../controllers/gameFeatures.js');
const constants       = require('./../properties/constants');

exports.route = route;

async function route(data, options){
    let app       = data[0];
    let command   = data[1];
    let word      = data[2];
    let gameState = options['gameState'];

  if(app && app == constants.CONFIG.APP){
    // action according the coming command
    switch(command){
      case constants.CONFIG.COMMANDS.DEFINITIONS:
          await generalFeatures.displayDefinitions(word);
          break;
      case constants.CONFIG.COMMANDS.SYNONYMS:
          await generalFeatures.displaySynonyms(word);
          break;
      case constants.CONFIG.COMMANDS.ANTONYMS:
          await generalFeatures.displayAntonyms(word);
          break;
      case constants.CONFIG.COMMANDS.EXAMPLES:
          await generalFeatures.displayExamples(word);
          break;
      case constants.CONFIG.COMMANDS.DICTIONARY:
          await generalFeatures.displayFullDictionary(word);
          break;
      case constants.CONFIG.COMMANDS.PLAY:
          await gameFeatures.initializeGame(gameState);
          break;
      case constants.CONFIG.COMMANDS.HELP:
          generalFeatures.displayHelp();
          break;
      default:
        await generalFeatures.defaultAction(command);
    }
  }else{
    generalFeatures.displayHelp();
  }
}
