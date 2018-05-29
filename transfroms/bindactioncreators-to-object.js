const reduxImportDeclaration = {
  source: {
    type: 'Literal',
    value: 'redux',
  },
}

const bindActionCreatorsImportSpecifier = {
  imported: {
    type: 'Identifier',
    name: 'bindActionCreators',
  },
}

module.exports = function(fileInfo, api, options) {
  const { jscodeshift: j } = api

  const root = j(fileInfo.source)

  root
    .find(j.ArrowFunctionExpression) 
    .filter(p => 
      j(p).find(j.CallExpression)
          .filter(c => c.value.callee.name === 'bindActionCreators')
          .size() === 1
    )
    .replaceWith(p => p.value.body.arguments[0])

  root
    .find(j.ImportDeclaration, reduxImportDeclaration)
    .find(j.ImportSpecifier, bindActionCreatorsImportSpecifier)
    .remove()

  // TODO: find the way to remove the import from redux when is empty

  // const reduxImport = root
  //   .find(j.ImportDeclaration)
  //   .filter(p => p.value.source === 'redux')

  // console.log({ size: reduxImportDeclaration })

  return root.toSource()

// e.scope.lookup
};

// TypeParameterDeclaration
// TypeParameterInstantiation
// TypeParameter

// ArrowFunctionExpression
// FunctionExpression

// CallExpression

// ImportSpecifier
// ImportNamespaceSpecifier
// ImportDefaultSpecifier
// ImportDeclaration
// Import

