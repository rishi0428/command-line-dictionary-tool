// local imports
const fourtyTwoWordsService = require('./../services/fourtyTwoWordsService');
const dictionary            = require('./../models/dictionary.js');
const { MESSAGE }           = require('./../properties/constants');

exports.displayDefinitions    = displayDefinitions;
exports.displaySynonyms       = displaySynonyms;
exports.displayAntonyms       = displayAntonyms;
exports.displayExamples       = displayExamples;
exports.displayFullDictionary = displayFullDictionary;
exports.displayWordOfTheDay   = displayWordOfTheDay;
exports.displayHelp           = displayHelp;
exports.defaultAction         = defaultAction;
exports.processRelatedWords   = processRelatedWords;
exports.processExamples       = processExamples;
exports.processDefinitionData = processDefinitionData;

async function displayDefinitions(word) {
  let data = await fourtyTwoWordsService.getDefinitions(word);
  if (data.valid) {
    processData(data.data, word, "definition");
  }else{
    console.log(data.error || MESSAGE.SOMETHING_WRONG);
  }
}

async function displaySynonyms(word) {
  let data = await fourtyTwoWordsService.getSynonyms(word);
  if (data.valid) {
    processData(data.data, word, "synonym");
  }else{
    console.log(data.error || MESSAGE.SOMETHING_WRONG);
  }
}

async function displayAntonyms(word) {
  let data = await fourtyTwoWordsService.getAntonyms(word);
  if (data.valid) {
    processData(data.data, word, "antonym");
  }else{
    console.log(data.error || MESSAGE.SOMETHING_WRONG);
  }
};

async function displayExamples(word) {
  let data = await fourtyTwoWordsService.getExamples(word);
  if (data.valid) {
    processData(data.data, word, "example");
  }else{
    console.log(data.error || MESSAGE.SOMETHING_WRONG);
  }
}

async function displayFullDictionary(word) {
  try{
    await displayDefinitions(word);
    await displaySynonyms(word);
    await displayAntonyms(word);
    await displayExamples(word);
  }catch(error){
    console.error(error);
  } 
}

async function displayWordOfTheDay() {
  let data = await fourtyTwoWordsService.getRandomWord();
  if (data.valid) {
    await displayFullDictionary(data.data.word);
  }else{
    console.log(data.error || MESSAGE.SOMETHING_WRONG);
  }
}

function displayHelp() {
  console.log(MESSAGE.HELP_MESSAGE);
};

async function defaultAction(word) {
  if (word) {
    await displayFullDictionary(word);
  } else {
    await displayWordOfTheDay();
  }
}

function processDefinitionData(defArray) {
  let definitions = [], data = {};
  try{
    defArray = JSON.parse(defArray);
  }catch(e){}
      
  defArray.forEach(function (def) {
    definitions.push(def.text);
  });

  data["definition"] = definitions;
  return data;
}

function processRelatedWords(type, body) {
  let relatedWords = [];
  let data         = {};

  for(let i=0 ; i< body.length; i++){
    let relationshipType = body[i].relationshipType;
    if(relationshipType != type){
      continue;
    }
    let words = body[i].words;
    for(let j=0; j<words.length; j++){
      relatedWords.push(words[j]);
    }
  }
  data[type] = relatedWords;
  return data;
}

function processExamples(body) {
  let examples = [];
  let data     = {};
  
  (body.examples).forEach(function (example) {
    examples.push(example.text);
  });
  data['example'] = examples;
  return data;
}

function processData(data, word, type){
  let processedData = [];
  if(type == "synonym" || type == "antonym"){
    processedData = processRelatedWords(type, data);
  }else if(type == "example"){
    processedData = processExamples(data);
  }else{
    processedData = processDefinitionData(data);
  }
    dictionary.showDictionary(word, processedData);
}