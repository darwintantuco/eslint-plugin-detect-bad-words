'use strict'

import { Rule } from 'eslint'
import * as ESTree from 'estree'
import { searchForBadWords, isEmpty, buildErrorMessage } from '../util'

module.exports = {
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const settings = context.settings || {}
    const customBadWords = settings.customBadWords || []
    const sourceCode = context.getSourceCode()

    const validate = (comment: ESTree.Comment) => {
      if (!comment.loc || !comment.value) return
      const result = searchForBadWords(customBadWords, comment.value)
      if (!isEmpty(result)) {
        context.report({
          loc: comment.loc,
          message: buildErrorMessage(result[0].trim()),
        })
      } else {
        return
      }
    }

    return {
      Program() {
        const comments: ESTree.Comment[] = sourceCode.getAllComments()
        comments.forEach(validate)
      },
    }
  },
}
