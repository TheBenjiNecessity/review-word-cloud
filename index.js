'use strict'

var wordlist = require("./words.json");
 
/**
  * Creates a dictionary from a string where each key is a word
  * from the string and the value is the number of times that word
  * shows up.
  * @param string comment - the review comment to be parsed.
  * @return obj - a dictionary of word 'weights'.
  */
module.exports = function wordCloudDict(comments) {
    var wordDict = [];

    comments.forEach(comment => {
        // Strip out all punctuation and special characters.
        comment = comment.toLowerCase().replace(/[^a-z ]/g, '');
        var words = comment.split(' ');

        words.forEach(word => {
            if (wordListContains(word)) {
                wordDict[word] = wordDict[word] ? wordDict[word] + 1 : 1;
            }
        });
    });

    return wordDict;
}

 /**
  * Performs a binary search on the word list for the given word.
  * I'm using this method since the word list is sorted and indexOf
  * would be slow should I add more words.
  * @param string word - the word to be searched for
  * @return bool - whether or not the word is in the list
  */
function wordListContains(word) {
    var l = 0, r = wordlist.length - 1;

    while (l <= r) {
        var m = Math.floor((l + r) / 2);
        if (wordlist[m] < word)
            l = m + 1
        else if (wordlist[m] > word)
            r = m - 1
        else
            return true;
    }

    return false;
}