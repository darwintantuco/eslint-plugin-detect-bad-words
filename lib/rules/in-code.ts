'use strict'

import { Rule } from 'eslint'
import * as ESTree from 'estree'
import { searchForBadWords, isEmpty, buildErrorMessage } from '../util'

module.exports = {
  create: (context: Rule.RuleContext): Rule.RuleListener => {
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

      JSXText(node: ESTree.Literal) {
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
