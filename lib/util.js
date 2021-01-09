'use strict'

const badwordsObject = require('badwords/object')

const searchForBadWords = (customBadWords, value) => {
  const badWordsResult = value.split(' ').reduce((acc, word) => {
    if (badwordsObject[word.trim().toLowerCase()] === 1) acc.push(word)
    return acc
  }, [])

  const customBadwordsResult = customBadWords.reduce((acc, word) => {
    const pattern = new RegExp('\\b' + escapeString(word) + '\\b', 'i')
    if (pattern.test(value)) acc.push(value.match(pattern)[0])
    return acc
  }, [])
  return [...badWordsResult, ...customBadwordsResult]
}

const isEmpty = (arr) => Array.isArray(arr) && arr.length === 0

const escapeString = (string) =>
  string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

module.exports = { searchForBadWords, isEmpty }
