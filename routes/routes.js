// local imports
const generalRoutes = require('./generalRoutes.js');
const gameRoutes    = require('./gameRoutes');

exports.route = route;

async function route(data, gameState){
  // if either data or config not present return
  if(!data || !gameState)
    return;

  // options to be passed to routes
  let options = {
    gameState : gameState
  };

  // split the data to extract app(./dic), command and word
  data = data.split(' ');

  // select the type of routes either general or word game related
  if(gameState['GAME_ENABLED'] == false){
    await generalRoutes.route(data, options);
  }
  else if(gameState['GAME_ENABLED'] == true){
    gameRoutes.route(data, options);
  }
};
