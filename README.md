# eslint-plugin-deny-word

Prevent unwanted words in code

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-deny-word`:

```
$ npm install eslint-plugin-deny-word --save-dev
```

## Usage

Add `deny-word` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["deny-word"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "deny-word/deny-word": "error"
  }
}
```

### Define deny words list

```json
"settings": {
    "denyWordList": ["fck", "sht", "tite"]
  }
```

## License

MIT
