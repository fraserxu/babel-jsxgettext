var fs = require('fs')
var glob = require('glob')
var gettextParser = require('gettext-parser')
var babylon = require('babylon')
var walk = require('acorn/dist/walk')

var SOURCE_PATTERN = './test/*.js'

var DEFAULT_FUNCTION_NAMES = {
  gettext: ['msgid'],
  dgettext: ['domain', 'msgid'],
  ngettext: ['msgid', 'msgid_plural', 'count'],
  dngettext: ['domain', 'msgid', 'msgid_plural', 'count'],
  pgettext: ['msgctxt', 'msgid'],
  dpgettext: ['domain', 'msgctxt', 'msgid'],
  npgettext: ['msgctxt', 'msgid', 'msgid_plural', 'count'],
  dnpgettext: ['domain', 'msgctxt', 'msgid', 'msgid_plural', 'count']
}

var DEFAULT_HEADERS = {
  'content-type': 'text/plain; charset=UTF-8',
  'plural-forms': 'nplurals = 2; plural = (n !== 1);'
}

var functionNames = DEFAULT_FUNCTION_NAMES

var data = {
  charset: 'UTF-8',

  headers: DEFAULT_HEADERS,

  translations: {
    context: {}
  }
}

var defaultContext = data.translations.context

var headers = data.headers
headers['plural-forms'] = headers['plural-forms'] || DEFAULT_HEADERS['plural-forms']
headers['content-type'] = headers['content-type'] || DEFAULT_HEADERS['content-type']

var nplurals = /nplurals ?= ?(\d)/.exec(headers['plural-forms'])[1]

var jsxBase = {
  JSXElement (node, st, c) {
    node.openingElement.attributes.forEach(function (attr) {
      c(attr, st, attr.type)
    })
    node.children.forEach(function (child) {
      c(child, st, child.type)
    })
  },
  JSXExpressionContainer (node, st, c) {
    c(node.expression, st, node.expression.type)
  },
  JSXAttribute (node, st, c) {
    if (node.value !== null) {
      c(node.value, st, node.value.type)
    }
  },
  JSXSpreadAttribute (node, st, c) {
    c(node.argument, st, node.argument.type)
  },
  ClassProperty (node, st, c) {
    // console.log(node, st, c)
  }
}
Object.setPrototypeOf(jsxBase, walk.base)

var test = glob.sync(SOURCE_PATTERN)
  .map(function (file) {
    return fs.readFileSync(file, 'utf8')
  })
  .map(function (src) {
    var ast = babylon.parse(src, {
      allowHashBang: true,
      ecmaVersion: Infinity,
      sourceType: 'module',
      plugins: {jsx: true},
      features: {
        'es7.classProperties': true
      }
    })

    walk.simple(ast.program, {
      CallExpression: function (node) {
        if (functionNames.hasOwnProperty(node.callee.name) ||
          node.callee.property && functionNames.hasOwnProperty(node.callee.property.name)) {
          var functionName = functionNames[node.callee.name] || functionNames[node.callee.property.name]
          var translate = {}

          var args = node.arguments
          for (var i = 0, l = args.length; i < l; i++) {
            var name = functionName[i]

            if (name && name !== 'count' && name !== 'domain') {
              var arg = args[i]
              var value = arg.value

              if (value) {
                translate[name] = value
              }

              if (name === 'msgid_plural') {
                translate.msgstr = []
                for (var p = 0; p < nplurals; p++) {
                  translate.msgstr[p] = ''
                }
              }
            }
          }

          var context = defaultContext
          var msgctxt = translate.msgctxt
          if (msgctxt) {
            data.translations[msgctxt] = data.translations[msgctxt] || {}
            context = data.translations[msgctxt]
          }

          context[translate.msgid] = translate
        }
      }
    }, jsxBase)

    return gettextParser.po.compile(data).toString()
  })

console.log('test', test)
