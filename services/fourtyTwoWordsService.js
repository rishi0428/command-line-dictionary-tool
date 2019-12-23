// module imports
const httpService = require("./httpRequestService");

// local imports
const constants = require('./../properties/constants');

exports.getDefinitions = getDefinitions;
exports.getSynonyms    = getSynonyms;
exports.getAntonyms    = getAntonyms;
exports.getExamples    = getExamples;
exports.getRandomWord  = getRandomWord;

async function getDefinitions(word) {
  let result = {
    valid: true,
    data: {}
  }
  try {
    let apiUrl = makeApiUrl(constants.CONFIG.API_URL.DEFINITIONS, word);
    let opts = makeRequestOptions(apiUrl);
    let response = await httpService.sendHttpRequest(opts);
    result.data = response
    return result;
  } catch (error) {
    result.valid = false;
    result.error = error;
    return result;
  }
}

async function getSynonyms(word) {
  let result = {
    valid: true,
    data: {}
  }
  try {
    let apiUrl = makeApiUrl(constants.CONFIG.API_URL.SYNONYMS, word);
    let opts = makeRequestOptions(apiUrl);
    let response = await httpService.sendHttpRequest(opts);
    result.data = response
    return result;
  } catch (error) {
    result.valid = false;
    result.error = error;
    return result;
  }
}

async function getAntonyms(word) {
  let result = {
    valid: true,
    data: {}
  }
  try {
    let apiUrl = makeApiUrl(constants.CONFIG.API_URL.ANTONYMS, word);
    let opts = makeRequestOptions(apiUrl);
    let response = await httpService.sendHttpRequest(opts);
    result.data = response
    return result;
  } catch (error) {
    result.valid = false;
    result.error = error;
    return result;
  }
}

async function getExamples(word) {
  let result = {
    valid: true,
    data: {}
  }
  try {
    let apiUrl = makeApiUrl(constants.CONFIG.API_URL.EXAMPLES, word);
    let opts = makeRequestOptions(apiUrl);
    let response = await httpService.sendHttpRequest(opts);
    result.data = response
    return result;
  } catch (error) {
    result.valid = false;
    result.error = error;
    return result;
  }
}

async function getRandomWord() {
  let result = {
    valid: true,
    data: {}
  }
  try {
    let apiUrl = makeApiUrl(constants.CONFIG.API_URL.RANDOM, "");
    let opts = makeRequestOptions(apiUrl);
    let response = await httpService.sendHttpRequest(opts);
    result.data = response
    return result;
  } catch (error) {
    result.valid = false;
    result.error = error;
    return result;
  }
}

function makeRequestOptions(apiUrl) {
  return {
    method: constants.REQUEST_METHODS.GET,
    url: apiUrl,
    qs: { api_key: constants.CONFIG.API_KEY }
  }
}

function makeApiUrl(endpoint, word){
  return constants.CONFIG.API_URL.BASE_URL + endpoint.replace('{word}', word);
}