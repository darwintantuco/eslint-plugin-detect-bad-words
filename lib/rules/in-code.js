'use strict'

const { searchForBadWords, isEmpty, buildErrorMessage } = require('../util')

module.exports = {
  create: (context) => {
    const settings = context.settings || {}
    const customBadWords = settings.customBadWords || []

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return

        const result = searchForBadWords(customBadWords, node.value)

        if (!isEmpty(result)) {
          context.report({
            node,
            message: buildErrorMessage(result[0].trim()),
          })
        } else {
          return
        }
      },

      JSXText(node) {
        if (typeof node.value !== 'string') return

        const result = searchForBadWords(customBadWords, node.value)

        if (!isEmpty(result)) {
          context.report({
            node,
            message: buildErrorMessage(result[0].trim()),
          })
        } else {
          return
        }
      },

      Identifier(node) {
        if (typeof node.name !== 'string') return

        const result = searchForBadWords(customBadWords, node.name)

        if (!isEmpty(result)) {
          context.report({
            node,
            message: buildErrorMessage(result[0].trim()),
          })
        } else {
          return
        }
      },
    }
  },
}
