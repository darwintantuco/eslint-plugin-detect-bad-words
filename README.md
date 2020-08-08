# eslint-plugin-detect-unwanted-words

![Node.js CI](https://github.com/darwintantuco/eslint-plugin-detect-unwanted-words/workflows/Node.js%20CI/badge.svg?branch=master)

Detect unwanted words in code and comments

![](demo.png)

## Installation

You'll first need to install [ESLint](http://eslint.org):

Next, install `eslint-plugin-detect-unwanted-words`:

### npm

```
$ npm install eslint-plugin-detect-unwanted-words --save-dev
```

### yarn

```
$ yarn add eslint-plugin-detect-unwanted-words --dev
```

## Usage

Add `detect-unwanted-words` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["detect-unwanted-words"]
}
```

Define unwanted words under settings section.

```json
{
  "settings": {
    "unwantedWords": ["fck", "sht", "tite", "trust me"]
  }
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "detect-unwanted-words/detect-unwanted-words-in-code": "error",
    "detect-unwanted-words/detect-unwanted-words-in-comments": "error"
  }
}
```

## License

MIT
