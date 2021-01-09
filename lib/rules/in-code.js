'use strict'

const { searchForBadWords, isEmpty } = require('../util')

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
            message: `Word \`${result[0].trim()}\` is not allowed.`,
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
            message: `Word \`${result[0].trim()}\` is not allowed.`,
          })
        } else {
          return
        }
      },
    }
  },
}
