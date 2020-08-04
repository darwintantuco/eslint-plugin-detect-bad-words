'use strict'

module.exports = {
  create: function (context) {
    const settings = context.settings || {}
    const denyWordList = settings.denyWordList || []
    const validate = (node) =>
      typeof node.value === 'string' && denyWordList.includes(node.value.trim())

    return {
      Literal(node) {
        if (validate(node)) {
          context.report({
            node,
            message: `Word \`${node.value.trim()}\` is not allowed.`,
          })
        }
      },

      JSXText(node) {
        if (validate(node)) {
          context.report({
            node,
            message: `Word \`${node.value.trim()}\` is not allowed.`,
          })
        }
      },
    }
  },
}
