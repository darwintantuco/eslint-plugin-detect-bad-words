'use strict'

export {}

import { RuleTester } from 'eslint'
import rule from '../../lib/rules/in-code'
import { buildErrorMessage } from '../../lib/util'

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const settings = {
  customBadWords: ['tite', 'fck'],
}

const ruleTester = new RuleTester({ parserOptions, settings })
const defaultErrors = (word: string) => [{ message: buildErrorMessage(word) }]

ruleTester.run('detect-bad-words-in-code', rule, {
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
    { code: "const temp = ''" },
    { code: 'class Temp {}' },
    { code: '{temp: 1}' },
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
    {
      code: "'hey BITCH'",
      errors: defaultErrors('BITCH'),
    },
    // identifiers
    {
      code: "const bitch = ''",
      errors: defaultErrors('bitch'),
    },
    {
      code: 'class Bitch {}',
      errors: defaultErrors('Bitch'),
    },
    {
      code: '{ bitch: 1 }',
      errors: defaultErrors('bitch'),
    },
    {
      code: `
        var bitch = {
          ass: 1
        };
      `,
      errors: [
        { message: buildErrorMessage('bitch') },
        { message: buildErrorMessage('ass') },
      ],
    },
    {
      code: `
        {
          bitch: 1
        }
      `,
      errors: defaultErrors('bitch'),
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
