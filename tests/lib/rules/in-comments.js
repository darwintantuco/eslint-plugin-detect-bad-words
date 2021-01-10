'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/in-comment')
const { buildErrorMessage } = require('../../../lib/util')

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const settings = {
  customBadWords: ['wtf', 'tite', 'fck', 'f*ck'],
}

const ruleTester = new RuleTester({ parserOptions, settings })
const defaultErrors = (word) => [{ message: buildErrorMessage(word) }]

ruleTester.run('detect-bad-words-in-comment', rule, {
  valid: [
    { code: '// title' },
    { code: '// TITLE' },
    { code: '/* title */' },
    { code: '// subtite' },
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
    // words from badwords package
    {
      code: '// bitch',
      errors: defaultErrors('bitch'),
    },
    {
      code: '// BITCH',
      errors: defaultErrors('BITCH'),
    },
    {
      code: '// Tittie5',
      errors: defaultErrors('Tittie5'),
    },
    {
      code: '// hey BITCH',
      errors: defaultErrors('BITCH'),
    },
    // custom bad words
    {
      code: '// tite',
      errors: defaultErrors('tite'),
    },
    {
      code: '// tite',
      errors: defaultErrors('tite'),
    },
    {
      code: '// f*ck',
      errors: defaultErrors('f*ck'),
    },
    {
      code: '// what the fck?',
      errors: defaultErrors('fck'),
    },
    {
      code: '/* tite */',
      errors: defaultErrors('tite'),
    },
    {
      code: '/* me fck */',
      errors: defaultErrors('fck'),
    },
    {
      code: '{/* tite */}',
      errors: defaultErrors('tite'),
    },
    {
      code: `{/*
        hey
        tite
      */}`,
      errors: defaultErrors('tite'),
    },
    {
      code: '// TITE',
      errors: defaultErrors('TITE'),
    },
    {
      code: '// wtf...',
      errors: defaultErrors('wtf'),
    },
    {
      code: `{/*
        hey
        wtf...
      */}`,
      errors: defaultErrors('wtf'),
    },
  ],
})
