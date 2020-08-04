'use strict'

module.exports = {
  create: function (context) {
    const settings = context.settings || {}
    const sourceCode = context.getSourceCode()
    const unwantedWordsRegex =
      settings.unwantedWords.map((word) => new RegExp(word)) || []
    const isValid = (value) =>
      typeof value !== 'string' ||
      !unwantedWordsRegex.some((regex) => regex.test(value))

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
