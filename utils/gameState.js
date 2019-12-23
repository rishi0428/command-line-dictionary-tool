/**
 * This defines the state of the game at any time
 */

const GameState =   {
  // toggle game on and off
  GAME_ENABLED              : false,
  // number of hints given
  HINT_COUNTER              : 0,
  // the word to play game for
  WORD                      : null,
  // definitions of word
  DEFINITIONS               : [],
  // synonyms of word
  SYNONYMS                  : [],
  // antonyms of word
  ANTONYMS                  : []
}

// exporting the module
module.exports = GameState;
