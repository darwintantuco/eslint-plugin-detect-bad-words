# eslint-plugin-detect-unwanted-words

Detect unwanted words in code and comments

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-detect-unwanted-words`:

```
$ npm install eslint-plugin-detect-unwanted-words --save-dev
```

## Usage

Add `detect-unwanted-words` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["detect-unwanted-words"]
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

### Define unwanted words

```json
"settings": {
  "react": {
    "version": "16.8"
  },
  "unwantedWords": ["fck", "sht", "tite", "trust me..."]
}
```

## License

MIT
