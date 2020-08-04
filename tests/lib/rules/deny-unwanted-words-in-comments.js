'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/detect-unwanted-words-in-comments')

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const settings = {
  unwantedWords: ['tite', 'fck'],
}

const ruleTester = new RuleTester({ parserOptions, settings })
const defaultErrors = (word) => [
  { message: `Word \`${word}\` is not allowed.` },
]

ruleTester.run('detect-unwanted-words-in-comment', rule, {
  valid: [
    { code: '// title' },
    { code: '/* title */' },
    { code: '{/* title */}' },
    {
      code: `{/*
        Multi
        line
        comment
      */}`,
    },
  ],
  invalid: [
    {
      code: '// tite',
      errors: defaultErrors('tite'),
    },
    {
      code: '/* tite */',
      errors: defaultErrors('tite'),
    },
    {
      code: '{/* tite */}',
      errors: defaultErrors('tite'),
    },
    {
      code: `{/*
        tite
      */}`,
      errors: defaultErrors('tite'),
    },
  ],
})
