"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/deny-words");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
};

const settings = {
  denyWordList: ["tite", "fck"],
};

const ruleTester = new RuleTester({ parserOptions, settings });
const defaultErrors = (word) => [
  { message: `Word \`${word}\` is not allowed.` },
];

ruleTester.run("deny-words", rule, {
  valid: [{ code: "'Awesome string'" }],
  invalid: [
    {
      code: "'tite'",
      errors: defaultErrors("tite"),
    },
    {
      code: "'fck'",
      errors: defaultErrors("fck"),
    },
    {
      code: "<div> tite </div>",
      errors: defaultErrors("tite"),
    },
    {
      code: `
        <div>
          tite
        </div>
      `,
      errors: defaultErrors("tite"),
    },
  ],
});
