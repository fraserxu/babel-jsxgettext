var features = {
  //- builtin-prepass
  "minification.constantFolding":          "babel-plugin-constant-folding",

  //- builtin-pre
  strict:                                  "./other/strict",
  eval:                                    "babel-plugin-eval",
  _validation:                             "./internal/validation",
  _hoistDirectives:                        "./internal/hoist-directives",
  "minification.removeDebugger":           "babel-plugin-remove-debugger",
  "minification.removeConsole":            "babel-plugin-remove-console",
  "utility.inlineEnvironmentVariables":    "babel-plugin-inline-environment-variables",
  "minification.deadCodeElimination":      "babel-plugin-dead-code-elimination",
  _modules:                                "./internal/modules",
  "react.displayName":                     "babel-plugin-react-display-name",
  "es6.spec.modules":                      "./es6/spec.modules",
  "es6.spec.arrowFunctions":               "./es6/spec.arrow-functions",
  "es6.spec.templateLiterals":             "./es6/spec.template-literals",
  "es6.templateLiterals":                  "./es6/template-literals",
  "es6.literals":                          "./es6/literals",
  "validation.undeclaredVariableCheck":    "babel-plugin-undeclared-variables-check",

  //- builtin-basic
  // this is where the bulk of the ES6 transformations take place, none of them require traversal state
  // so they can all be concatenated together for performance
  "spec.functionName":                     "./spec/function-name",
  "es7.classProperties":                   "./es7/class-properties",
  "es7.trailingFunctionCommas":            "./es7/trailing-function-commas",
  "es7.asyncFunctions":                    "./es7/async-functions",
  "es7.decorators":                        "./es7/decorators",
  "validation.react":                      "./validation/react",
  "es6.arrowFunctions":                    "./es6/arrow-functions",
  "spec.blockScopedFunctions":             "./spec/block-scoped-functions",
  "optimisation.react.constantElements":   "babel-plugin-react-constant-elements",
  "optimisation.react.inlineElements":     "./optimisation/react.inline-elements",
  "es7.comprehensions":                    "./es7/comprehensions",
  "es6.classes":                           "./es6/classes",
  asyncToGenerator:                        "./other/async-to-generator",
  bluebirdCoroutines:                      "./other/bluebird-coroutines",
  "es6.objectSuper":                       "./es6/object-super",
  "es7.objectRestSpread":                  "./es7/object-rest-spread",
  "es7.exponentiationOperator":            "./es7/exponentiation-operator",
  "es5.properties.mutators":               "./es5/properties.mutators",
  "es6.properties.shorthand":              "./es6/properties.shorthand",
  "es6.properties.computed":               "./es6/properties.computed",
  "optimisation.flow.forOf":               "./optimisation/flow.for-of",
  "es6.forOf":                             "./es6/for-of",
  "es6.regex.sticky":                      "./es6/regex.sticky",
  "es6.regex.unicode":                     "./es6/regex.unicode",
  "es6.constants":                         "./es6/constants",
  "es7.exportExtensions":                  "./es7/export-extensions",
  "spec.protoToAssign":                    "babel-plugin-proto-to-assign",
  "es7.doExpressions":                     "./es7/do-expressions",
  "es6.spec.symbols":                      "./es6/spec.symbols",
  "es7.functionBind":                      "./es7/function-bind",
  "spec.undefinedToVoid":                  "babel-plugin-undefined-to-void",

  //- builtin-advanced
  "es6.spread":                            "./es6/spread",
  "es6.parameters":                        "./es6/parameters",
  "es6.destructuring":                     "./es6/destructuring",
  "es6.blockScoping":                      "./es6/block-scoping",
  "es6.spec.blockScoping":                 "./es6/spec.block-scoping",
  reactCompat:                             "./other/react-compat",
  react:                                   "./other/react",
  regenerator:                             "./other/regenerator",

  // es6 syntax transformation is **forbidden** past this point since regenerator will chuck a massive
  // hissy fit

  //- builtin-modules
  runtime:                                 "babel-plugin-runtime",
  "es6.modules":                           "./es6/modules",
  _moduleFormatter:                        "./internal/module-formatter",

  //- builtin-trailing
  // these clean up the output and do finishing up transformations, it's important to note that by this
  // stage you can't import any new modules or insert new ES6 as all those transformers have already
  // been ran
  "es6.tailCall":                          "./es6/tail-call",
  _shadowFunctions:                        "./internal/shadow-functions",
  "es3.propertyLiterals":                  "./es3/property-literals",
  "es3.memberExpressionLiterals":          "./es3/member-expression-literals",
  "minification.memberExpressionLiterals": "babel-plugin-member-expression-literals",
  "minification.propertyLiterals":         "babel-plugin-property-literals",
  _blockHoist:                             "./internal/block-hoist",
  jscript:                                 "babel-plugin-jscript",
  flow:                                    "./other/flow",
  "optimisation.modules.system":           "./optimisation/modules.system"
};

console.log(Object.keys(features))
