const fourtyTwoWordsService = require('./../services/fourtyTwoWordsService');
const { MESSAGE }           = require('./../properties/constants');
const utils                 = require('./../utils/helpers');
const generalFeatures       = require('./../controllers/generalFeatures.js');
const dictionary            = require('./../models/dictionary');

exports.initializeGame       = initializeGame;
exports.getGameWordData      = getGameWordData;
exports.getDataRelatedToWord = getDataRelatedToWord;
exports.askQuestion          = askQuestion;
exports.checkAnswer          = checkAnswer;
exports.quitGame             = quitGame;
exports.nextChance           = nextChance;
exports.getHint              = getHint;

async function initializeGame(gameState) {
  try {
    gameState.GAME_ENABLED = true;
    await getGameWordData(gameState);
    let deferredArray = await getDataRelatedToWord(gameState.WORD, gameState);

    for(let i=0; i<deferredArray.length; i++){
      let func = deferredArray[i];
      try{
        await func();
      }catch(err){
        console.error(MESSAGE.GAME_START_ERROR);
      }
    }
    if(deferredArray.length){
      askQuestion(gameState);
    }
  } catch (error) {
    console.error(MESSAGE.GAME_START_ERROR);
  }
}

async function getGameWordData(gameState) {
  try {
    let data = await fourtyTwoWordsService.getRandomWord();
    if (data.valid) {
      gameState.WORD = data.data.word;
    } else {
      throw data.error;
    }
  } catch (error) {
    throw error;
  }
}

async function getDataRelatedToWord(word, gameState) {
    let defArray = [];

    defArray.push(
      async ()=>{
        let defData = await fourtyTwoWordsService.getDefinitions(word);
        if(defData.valid){
          let data = generalFeatures.processDefinitionData(defData.data);
          data = data["definition"];
          data.forEach(function (def) {
            gameState.DEFINITIONS.push('DEFINITION' + ' | ' + def);
          });
        }else{
          console.log(dictionary.makeErrorMessage(null, "definition"));
        }
      }
    );

  defArray.push(
    async ()=>{
      let synData = await fourtyTwoWordsService.getSynonyms(word);
      if(synData.valid){
        let data = generalFeatures.processRelatedWords("synonym", synData.data);
        data = data["synonym"];
        data.forEach(function (word) {
            gameState.SYNONYMS.push('SYNONYM | ' + word);
          });
      }else{
        console.log(dictionary.makeErrorMessage(null, "synonyms"));
      }
    }
  )

  defArray.push(
    async ()=>{
      let antData = await fourtyTwoWordsService.getAntonyms(word);
      if(antData.valid){
        let data = generalFeatures.processRelatedWords("antonym", antData.data);
        data = data["antonym"];
        data.forEach(function (word) {
            gameState.ANTONYMS.push('ANTONYM | ' + word);
          });
      }else{
        console.log(dictionary.makeErrorMessage(null, "antonym"));
      }
    }
  )
  return defArray;
}

function askQuestion(gameState) {
  var question = [];
  // taking definition
  if (gameState.DEFINITIONS.length > 0) {
    question.push(gameState.DEFINITIONS.pop());
  }
  // if synonym present take it otherwise take antonym
  if (gameState.SYNONYMS.length > 0) {
    question.push(gameState.SYNONYMS.pop());
  }
  else if (gameState.ANTONYMS.length > 0) {
    question.push(gameState.ANTONYMS.pop());
  }
  // Display the question
  utils.showArrayData(MESSAGE.QUESTION_HEADING, question);
  console.log(MESSAGE.ENTER_ANSWER);
  // enable answer
  gameState.ENABLE_ANSWER = true;
}

function checkAnswer(answer, gameState) {
  let answerStatus;

  // firstly checking against the word
  if (gameState.WORD.toLowerCase() == answer.toLowerCase())
    answerStatus = true;

  // checking against not till now asked synonyms of the asked word
  (gameState.SYNONYMS).forEach((syn) => {
    if (syn.toLowerCase() == answer.toLowerCase()) {
      answerStatus = true;
    }
  });

  // displa relevent message according to the answer status
  if (answerStatus) {
    console.log('\nCorrect answer');
    quitGame(gameState);
  }
  else {
    console.log('\nWrong answer');
    console.log(MESSAGE.GAME_OPTIONS);
  }
}

function quitGame(gameState) {
  // display word and its full dictionary, resuing the general feature
  generalFeatures.displayFullDictionary(gameState.WORD);
  console.log(MESSAGE.GAME_QUIT);
  // reset the game state
  gameState.GAME_ENABLED = false;
  gameState.WORD         = null;
  gameState.DEFINITIONS  = [];
  gameState.SYNONYMS     = [];
  gameState.ANTONYMS     = [];
  gameState.HINT_COUNTER = 0;

}

function nextChance() {
  console.log(MESSAGE.TRY_AGAIN);
}

function getHint(gameState) {
  let hintCount = gameState.HINT_COUNTER,
      hint      = [],
    message;

  switch (hintCount) {
    case 0: 
      hint.push(utils.getJumbleWord(gameState.WORD));
      message = MESSAGE.HINTS.JUMBLE_WORD;
      break;
    case 1: 
      hint.push(gameState.DEFINITIONS.pop());
      message = MESSAGE.HINTS.DEFINITION;
      break;
    case 2: 
      hint.push(gameState.SYNONYMS.pop());
      message = MESSAGE.HINTS.SYNONYM;
      break;
    case 3: 
      hint.push(gameState.ANTONYMS.pop());
      message = MESSAGE.HINTS.ANTONYM;
      break;
  }

  // if no hint is available then provide the jumble word
  if (hintCount > 0 && typeof hint[0] == 'undefined') {
    hint[0]      = utils.getJumbleWord(gameState.WORD);
         message = MESSAGE.HINTS.JUMBLE_WORD;
  }

  // printing the hint
  utils.showArrayData(message, hint);

  // updating the value of  hint counter
  if (hint == 3)
    gameState.HINT_COUNTER = 0;
  else
    gameState.HINT_COUNTER = gameState.HINT_COUNTER + 1;
}
