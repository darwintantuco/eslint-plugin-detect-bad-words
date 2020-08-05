'use strict'

const { searchForUnwantedWords, isEmpty } = require('../util')

module.exports = {
  create: (context) => {
    const settings = context.settings || {}
    const unwantedWords = settings.unwantedWords || []
    const sourceCode = context.getSourceCode()

    const validate = (comment) => {
      const result = searchForUnwantedWords(unwantedWords, comment.value)
      if (!isEmpty(result)) {
        context.report({
          node: null,
          loc: comment.loc,
          message: `Word \`${result[0].trim()}\` is not allowed.`,
        })
      } else {
        return
      }
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments()

        comments.filter((token) => token.type !== 'Shebang').forEach(validate)
      },
    }
  },
}
