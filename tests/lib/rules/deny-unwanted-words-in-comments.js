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
  unwantedWords: ['tite', 'fck', 'trust me', 'f*ck'],
}

const ruleTester = new RuleTester({ parserOptions, settings })
const defaultErrors = (word) => [
  { message: `Word \`${word}\` is not allowed.` },
]

ruleTester.run('detect-unwanted-words-in-comment', rule, {
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
    { code: '// me trust' },
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
    // custom bad words
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
      code: '// trust me...',
      errors: defaultErrors('trust me'),
    },
    {
      code: `{/*
        hey
        trust me...
      */}`,
      errors: defaultErrors('trust me'),
    },
  ],
})
