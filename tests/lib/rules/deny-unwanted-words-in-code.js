'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/detect-unwanted-words-in-code')

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

ruleTester.run('detect-unwanted-words-in-code', rule, {
  valid: [
    { code: "'Awesome string'" },
    { code: '<h1> Awesome string </h1>' },
    { code: "let b = 'subtite'" },
    {
      code: `
        <AwesomeComponent
          statusCode={202}
          title="My title"
        />
      `,
    },
  ],
  invalid: [
    // words from badwords package
    {
      code: "'bitch'",
      errors: defaultErrors('bitch'),
    },
    {
      code: "'BITCH'",
      errors: defaultErrors('BITCH'),
    },
    {
      code: "'Tittie5'",
      errors: defaultErrors('Tittie5'),
    },
    // custom bad words
    {
      code: "'fck'",
      errors: defaultErrors('fck'),
    },
    {
      code: "'fck?'",
      errors: defaultErrors('fck'),
    },
    {
      code: "'me fck'",
      errors: defaultErrors('fck'),
    },
    {
      code: "const a = 'tite'",
      errors: defaultErrors('tite'),
    },
    {
      code: '<div> tite </div>',
      errors: defaultErrors('tite'),
    },
    {
      code: `
        <div>
          hey
          tite
        </div>
      `,
      errors: defaultErrors('tite'),
    },
    {
      code: "'me FCK'",
      errors: defaultErrors('FCK'),
    },
  ],
})
