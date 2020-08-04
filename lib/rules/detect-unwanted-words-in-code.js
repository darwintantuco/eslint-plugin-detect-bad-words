'use strict'

module.exports = {
  create: function (context) {
    const settings = context.settings || {}
    const unwantedWordsRegex =
      settings.unwantedWords.map((word) => new RegExp(word)) || []
    const isValid = (value) =>
      typeof value !== 'string' ||
      !unwantedWordsRegex.some((regex) => regex.test(value))

    return {
      Literal(node) {
        if (!isValid(node.value)) {
          context.report({
            node,
            message: `Word \`${node.value.trim()}\` is not allowed.`,
          })
        } else {
          return
        }
      },

      JSXText(node) {
        if (!isValid(node.value)) {
          context.report({
            node,
            message: `Word \`${node.value.trim()}\` is not allowed.`,
          })
        }
      },
    }
  },
}
