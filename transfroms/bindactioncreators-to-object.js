const R = require('ramda');

const importDeclarationRedux = {
  source: {
    type: 'Literal',
    value: 'redux',
  },
};

const importSpecifierBAC = {
  imported: {
    type: 'Identifier',
    name: 'bindActionCreators',
  },
};

const isReduxEmptyImport = R.both(
  R.pathEq(['value', 'source', 'value'], 'redux'),
  R.pathEq(['value', 'specifiers', 'length'], 0),
);

const hasOnlyOneParam = R.pathEq(['value', 'params', 'length'], 1);
const bodyIsCallExpression = R.pathEq(
  ['value', 'body', 'type'],
  'CallExpression',
);
const bodyCalleeIsBAC = R.pathEq(
  ['value', 'body', 'callee', 'name'],
  'bindActionCreators',
);

const shouldReplace = R.allPass([
  hasOnlyOneParam,
  bodyIsCallExpression,
  bodyCalleeIsBAC,
]);

const firstBodyArgument = R.path(['value', 'body', 'arguments', 0]);

module.exports = function(fileInfo, api, options) {
  if (R.test(/tsx?$/, fileInfo.path)) {
    return fileInfo.source;
  }

  const { jscodeshift: j } = api;

  const root = j(fileInfo.source);

  let didRemove = false;

  // find functions containing bindActionCreators and
  // replace with bindActionCreators's first argument
  root
    .find(j.ArrowFunctionExpression)
    .filter(shouldReplace)
    .replaceWith(p => {
      didRemove = true;

      return firstBodyArgument(p);
    });

  // prevents removing the import when there's a
  // bindActionCreator imported but was not remvoed
  if (didRemove) {
    // remove "bindActionCreators" from redux import
    root
      .find(j.ImportDeclaration, importDeclarationRedux)
      .find(j.ImportSpecifier, importSpecifierBAC)
      .remove();

    // remove redux import if empty
    root
      .find(j.ImportDeclaration)
      .filter(isReduxEmptyImport)
      .remove();
  }

  return root.toSource();
};
