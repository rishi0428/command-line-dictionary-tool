// imports
const _      = require('underscore');

// Defines all the helper functions

const Helpers = {
  /**
  * This prints heading and each element of the array
  * @param {array} array
  */

  showArrayData: function (heading, array) {
    if (array.length == 0)
      return;
    // printing heading
    this.printHeading(heading);
    // printing data
    array.forEach((el) => {
      console.log(el + '\n');
    });
  },

  /**
  * Creates a jumble word for the given word and returns it
  * @param {String} word
  */

  getJumbleWord: function (word) {
    var wordsArray  = word.split('');
        jumbleArray = _.shuffle(wordsArray);

    return jumbleArray.join('');
  },
  printHeading: function(heading){
    console.log('------------------------------------------------------------------');
    console.log(heading + '\n');
  }
};

// exporting helper module
module.exports = Helpers;
