babel-jsxgettext
================

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

A tool like [jsxgettext](https://www.npmjs.com/package/jsxgettext), but works for `es6` + `jsx` that babel support.

I have a blog post explain my translation workflow in an [Electron app with React + Babel](https://fraserxu.me/2015/09/18/translation-workflow-in-Electron-application/).

### Usage

```
$ npm install babel-jsxgettext --save-dev
```

### API

```JavaScript
var parser = require('babel-jsxgettext')

/**
 * The parser function
 * @param  {String}   input  The path to source JavaScript file
 * @param  {String}   output The path of the output PO file
 * @param  {String}   plugins Babel plugins, separate by `,`
 * @param  {Function} cb     The callback function
 */
parser(inputs, output, plugins, function (err) {
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

I'm Using Babel with React + JSX for most of my project, but there's no perfect and direct way to generate `.po` file from ES6 + JSX code(or from a directory).

`acron-jsx` support `jsx` but not all the feature I use in Babel(ES7 etc.,). So I grab the `babylon` parser from Babel and use it to generate `.po` file.

### License
MIT

[npm-image]: https://img.shields.io/npm/v/babel-jsxgettext.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-jsxgettext
[travis-image]: https://img.shields.io/travis/fraserxu/babel-jsxgettext/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/fraserxu/babel-jsxgettext
[downloads-image]: http://img.shields.io/npm/dm/babel-jsxgettext.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/babel-jsxgettext
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
