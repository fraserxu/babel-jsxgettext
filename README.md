# babel-jsxgettext
A tool like [jsxgettext](https://www.npmjs.com/package/jsxgettext), but works for `es6` + `jsx` that babel support.

This tool is still WIP.

### Usage

```
$ npm install babel-jsxgettext ---save-dev
```

### API

```JavaScript
var parser = require('babel-jsxgettext')

parser(inputs, output, function (err) {
  if (err) throw err
  console.log('Job completed!')
})
```

### Command line usage

Install globally with npm `npm install babel-jsxgettext -g`

```
  A tool like jsxgettext, but works for es6 + jsx that babel support

  Options
    --help                     Show this help
    --version                  Current version of package
    -i | --input               String - The path to soure JavaScript file
    -o | --output              String - The path of the output PO file

  Usage
    $ babel-jsxgettext --help
    $ babel-jsxgettext <input> <output>

  Examples
    $ babel-jsxgettext ./test/*.js ./test.po
```


### Why

I'm Using Babel with React + JSX for most of my project, but there's no perfect and direct way to generate `.po` file from ES6 + JSX code.

`acron-jsx` support `jsx` but not all the feature I use in Babel(ES7 etc.,). So I grab the `babylon` parser from Babel and use it to generate `.po` file.

### License
MIT
