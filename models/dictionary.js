// imports
const helpers   = require('./../utils/helpers.js');
const {MESSAGE} = require('./../properties/constants');

exports.showDictionary = showDictionary;
exports.makeErrorMessage = makeErrorMessage;

function showDictionary(word, data) {
  word        = word;
  definitions = data['definition'] ? data['definition'] : [];
  antonyms    = data['antonym'] ? data['antonym'] : [];
  synonyms    = data['synonym'] ? data['synonym'] : [];
  examples    = data['example'] ? data['example'] : [];

  // printing the word
  console.log('Word: ' + word);
  // printing definitions
  if(definitions.length){
    helpers.showArrayData('Definitions', definitions);
  }else if(data.definition){
    helpers.printHeading("definition");
    console.error(makeErrorMessage(null, "definition"));
  }
  // printing synonyms
  if(synonyms.length){
    helpers.showArrayData('Synonyms ', synonyms);
  }else if(data.synonym){
    helpers.printHeading("synonym");
    console.error(makeErrorMessage(null, "synonym"));
  }
  // printing antonyms
  if(antonyms.length){
    helpers.showArrayData('Antonyms', antonyms);
  }else if(data.antonym){
    helpers.printHeading("antonym");
    console.error(makeErrorMessage(null, "antonym"));
  }
  // printing examples
  if(examples.length){
    helpers.showArrayData('Examples', examples);
  }else if(data.example){
    helpers.printHeading("example");
    console.error(makeErrorMessage(null, "example"));
  }
}

function makeErrorMessage(text, type){
  if(!text){
    text = MESSAGE.NO_DATA;
  }
  return text.replace("{{data}}", type || "data") + '\n';
}