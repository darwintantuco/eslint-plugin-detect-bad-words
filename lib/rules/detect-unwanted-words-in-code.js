'use strict'

module.exports = {
  create: function (context) {
    const settings = context.settings || {}
    const unwantedWords = settings.unwantedWords || []
    const isValid = (value) =>
      typeof value !== 'string' || !unwantedWords.includes(value.trim())

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
