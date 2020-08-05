const searchForUnwantedWords = (unwantedWords, value) => {
  return value.split(' ').reduce((acc, word) => {
    if (
      word.trim() !== '' &&
      unwantedWords.includes(word.trim().toLowerCase())
    ) {
      acc.push(word.trim())
    }
    return acc
  }, [])
}

const isEmpty = (arr) => Array.isArray(arr) && arr.length === 0

module.exports = {
  searchForUnwantedWords,
  isEmpty,
}
