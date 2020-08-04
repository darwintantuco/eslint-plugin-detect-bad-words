'use strict'

module.exports = {
  create: function (context) {
    const settings = context.settings || {}
    const sourceCode = context.getSourceCode()
    const unwantedWords = settings.unwantedWords || []
    const isValid = (value) =>
      typeof value !== 'string' || !unwantedWords.includes(value.trim())

    const validateComment = (comment) => {
      if (!isValid(comment.value)) {
        context.report({
          node: null,
          loc: comment.loc,
          message: `Word \`${comment.value.trim()}\` is not allowed.`,
        })
      }
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments()

        comments
          .filter((token) => token.type !== 'Shebang')
          .forEach(validateComment)
      },
    }
  },
}
