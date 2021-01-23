# Changelog

All changes on this project will be documented in this file.

## [1.0.7] - January 23, 2021

- More strict typescript config
- Remove unused eslint plugins

## [1.0.6] - January 11, 2021

- Fix compilation issue

## [1.0.5] - January 11, 2021

- Initial release
- Rename package from `eslint-plugin-detect-unwanted-words` to `eslint-plugin-detect-bad-words`
- Publish `eslint-plugin-detect-bad-words`
- Deprecate `eslint-plugin-detect-unwanted-words`
- Use [badwords](https://github.com/MauriceButler/badwords) under the hood
- Detect bad words on identifiers
- Configure eslint
- Configure typescript

---

### eslint-plugin-detect-unwanted-words

- deprecated
- previous package name

#### [1.0.4] - August 5, 2020

- Optimize search logic

#### [1.0.3] - August 5, 2020

- Fix bug when `unwantedWords` contains an item with multiple words

#### [1.0.2] - August 5, 2020

- Minor improvements, handle both lowercase and uppercase

#### [1.0.1] - August 4, 2020

- Use regex when checking for unwanted words

#### [1.0.0] - August 4, 2020

- Initial release
