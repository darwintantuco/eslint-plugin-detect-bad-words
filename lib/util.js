const searchForUnwantedWords = (unwantedWords, value) => {
  return unwantedWords.reduce((acc, word) => {
    const pattern = new RegExp('\\b' + escapeString(word) + '\\b', 'i')
    if (pattern.test(value)) {
      acc.push(value.match(pattern)[0])
    }
    return acc
  }, [])
}

const isEmpty = (arr) => Array.isArray(arr) && arr.length === 0

const escapeString = (string) =>
  string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

module.exports = {
  searchForUnwantedWords,
  isEmpty,
}
