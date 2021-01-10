'use strict'

import badwordsObject from 'badwords/object'

const escapeString = (string: string) =>
  string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

export const searchForBadWords = (
  customBadWords: string[],
  value: string
): string[] => {
  const badWordsResult = value
    .split(' ')
    .reduce((acc: string[], word: string) => {
      if (badwordsObject[word.trim().toLowerCase()] === 1) acc.push(word)
      return acc
    }, [])

  const customBadwordsResult = customBadWords.reduce(
    (acc: string[], word: string) => {
      const pattern = new RegExp('\\b' + escapeString(word) + '\\b', 'i')
      if (pattern.test(value)) {
        const match = value.match(pattern)
        if (match) acc.push(match[0])
      }
      return acc
    },
    []
  )
  return [...badWordsResult, ...customBadwordsResult]
}

export const isEmpty = (arr: string[]): boolean =>
  Array.isArray(arr) && arr.length === 0

export const buildErrorMessage = (word: string): string =>
  `Word \`${word}\` is not allowed.`
