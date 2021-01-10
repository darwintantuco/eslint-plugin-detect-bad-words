'use strict'

const { searchForBadWords, isEmpty, buildErrorMessage } = require('../util')

module.exports = {
  create: (context) => {
    const settings = context.settings || {}
    const customBadWords = settings.customBadWords || []
    const sourceCode = context.getSourceCode()

    const validate = (comment) => {
      const result = searchForBadWords(customBadWords, comment.value)
      if (!isEmpty(result)) {
        context.report({
          node: null,
          loc: comment.loc,
          message: buildErrorMessage(result[0].trim()),
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
