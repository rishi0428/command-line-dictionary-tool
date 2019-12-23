
exports.CONFIG = {
  APP_NAME: 'DictionaryTool',

  // fourtytwowords.herokuapp.com api key
  API_KEY: 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164',

  // diasbled the game routes
  ENABLE_GAME_ROUTES: false,

  // API url
  API_URL: {
    BASE_URL   : 'https://fourtytwowords.herokuapp.com',
    DEFINITIONS: '/word/{word}/definitions',
    SYNONYMS   : '/word/{word}/relatedWords?',
    ANTONYMS   : '/word/{word}/relatedWords?',
    EXAMPLES   : '/word/{word}/examples?',
    RANDOM     : '/words/randomWord?api_key={api_key}'
  },

  APP: './dict',

  // general commands
  COMMANDS: {
    DEFINITIONS: 'defn',
    SYNONYMS   : 'syn',
    ANTONYMS   : 'ant',
    EXAMPLES   : 'ex',
    DICTIONARY : 'dict',
    HELP       : '--help',
    PLAY       : 'play'
  },

  // possible game inputs
  GAME_COMMANDS: {
    TRY_AGAIN: '1',
    HINT     : '2',
    QUIT     : '3'
  },
};

exports.REQUEST_METHODS = {
  POST  : "POST",
  GET   : "GET",
  PUT   : "PUT",
  DELETE: "DELETE"
}


exports.MESSAGE = {

  STARTUP_MESSAGE: 'Dictionary Tool, help command: ./dict --help\n ',

  // no data error
  NO_DATA: 'Sorry, no {{data}} found for the given word',

  // help message for user
  HELP_MESSAGE: `
Available commands:
For definition:                  ./dict defn <word>
For synonyms:                    ./dict syn <word>
For antonyms:                    ./dict ant <word>
For examples:                    ./dict ex <word>
For full dictionary:             ./dict <word> or ./dict dict <word>
For word of the day dictionary:  ./dict
For word game:                   ./dict play
To exit:                         exit
`,

  // error while fetching data for word game
  GAME_START_ERROR: 'Unable to fetch question for game please try again',

  // heading to be displayed at start of game
  QUESTION_HEADING: 'GUESS THE WORD BASED ON FOLLOWING INFO',

  // Answer prompt
  ENTER_ANSWER: 'Enter your answer:',

  // game options for user
  GAME_OPTIONS: `
  1. Try again
  2. Hint
  3. quit
  `,

  //game over Message
  GAME_QUIT: `
  Game is over, you may need ./dict --help
  `,

  //try again, enter new guess
  TRY_AGAIN: `
  Enter answer again
  `,

  HINTS: {
    JUMBLE_WORD: 'HINT - JUMBLED WORD',
    DEFINITION : 'HINT - ANOTHER DEFINITION',
    SYNONYM    : 'HINT - ANOTHER SYNONYM',
    ANTONYM    : 'HINT - ANOTHER ANTONYM'
  },
  SOMETHING_WRONG : "Something is not right"
};

exports.GAME_STATE =  {
  GAME_ENABLED: false,
  HINT_COUNTER: 0,
  WORD        : null,
  DEFINITIONS : [],
  SYNONYMS    : [],
  ANTONYMS    : []
}