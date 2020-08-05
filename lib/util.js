const searchForUnwantedWords = (unwantedWords, value) => {
  return unwantedWords
    .map((word) => new RegExp('\\b' + word + '\\b', 'i'))
    .filter((regex) => regex.test(value))
    .map((regex) => value.match(regex)[0])
}

const isEmpty = (arr) => Array.isArray(arr) && arr.length === 0

module.exports = {
  searchForUnwantedWords,
  isEmpty,
}
