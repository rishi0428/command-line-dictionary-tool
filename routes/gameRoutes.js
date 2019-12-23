const gameFeatures = require('./../controllers/gameFeatures.js');
const {CONFIG}     = require('./../properties/constants');

exports.route = route;

function route(input, options){
  let gameState = options['gameState'];
  if(input){
    switch(input[0]){
      case CONFIG.GAME_COMMANDS.TRY_AGAIN:
          gameFeatures.nextChance();
          break;
      case CONFIG.GAME_COMMANDS.HINT:
          gameFeatures.getHint(gameState);
          break;
      case CONFIG.GAME_COMMANDS.QUIT:
          gameFeatures.quitGame(gameState);
          break;
      default:
          gameFeatures.checkAnswer(input[0], gameState);
    }
  }
}
