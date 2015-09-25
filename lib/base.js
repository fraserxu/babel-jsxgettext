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

module.exports = jsxBase
