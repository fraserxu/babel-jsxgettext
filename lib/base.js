var jsxBase = {
    JSXElement: function (node, st, c) {
    node.openingElement.attributes.forEach(function (attr) {
      c(attr, st, attr.type)
    })
    node.children.forEach(function (child) {
      c(child, st, child.type)
    })
  },
  JSXExpressionContainer: function (node, st, c) {
    c(node.expression, st, node.expression.type)
  },
  JSXAttribute: function (node, st, c) {
    if (node.value !== null) {
      c(node.value, st, node.value.type)
    }
  },
  JSXSpreadAttribute: function (node, st, c) {
    c(node.argument, st, node.argument.type)
  },
  ClassProperty: function (node, st, c) {
    // console.log(node, st, c)
  },
  BindExpression: function (node, st, c) {
  },
  JSXEmptyExpression: function () {
  },
}

module.exports = jsxBase
