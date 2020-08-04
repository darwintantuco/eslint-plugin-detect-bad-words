# eslint-plugin-deny-words

Deny unwanted words in code

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-deny-words`:

```
$ npm install eslint-plugin-deny-words --save-dev
```

## Usage

Add `deny-words` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["deny-words"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "deny-words/deny-words": "error"
  }
}
```

### Define deny word list

```json
"settings": {
  "react": {
    "version": "16.8"
  },
  "denyWordList": ["fck", "sht", "tite"]
}
```

## License

MIT
