<h1 align="center">ha-codemods</h1>

<p align="center">A collection of codemod scripts for <a href="https://github.com/facebook/jscodeshift">JSCodeshift</a> that help to update JavaScript codebases.</p>

## Install & Run

```shell
git clone https://github.com/gillchristian/ha-codemods.git
cd $_
yarn install
yarn run mod -t <codemod-script> <file-1> <file-2> ... <file-N>
```

Use the `-d` option for a _dry-run_.

It is also possible to install JSCodeshift globally and use it instead of
`yarn run mod`:

```shell
yarn global add jscodeshift
git clone https://github.com/gillchristian/ha-codemods.git
jscodeshift -t <codemod-script> <file-1> <file-2> ... <file-N>
```

**Example**: to run the `bindActionCreators` to object transformation on the
`index.js` of a project do:

```shell
yarn run mod -t transfroms/bac-to-object.js ../path/to/project/index.js
```

JSCodeshift does not support globs but it works for directories and would run on
all JS files in the directory.

You can also use [xargs](https://en.wikipedia.org/wiki/Xargs) combined with
some, for example, grep like tool. The following will run in all the files that
contain `bindActionCreators` in a git repo:

```shell
git grep -l bindActionCreators ../path/to/repo | xargs yarn run mod -t transfroms/bac-to-object.js
```

## Included Codemod Scripts

All codemod scripts are in the `transforms/` directory.

### `bindActionCreators-to-object`

```shell
yarn mod -t transforms/bac-to-object.js <file>
```

Replaces arrow functions that return a call to `bindActionsCreators` to the
object shorthand version and removes the import.

**Example**:

```js
// input
export default connect(
  state => ({ foo: getFoo(state) }),
  dispatch =>
    bindActionCreators(
      {
        handleSubmit: sendData,
        handleClick: validateDate,
      },
      dispatch,
    ),
)(MyComponent)

// output
export default connect(
  state => ({ foo: getFoo(state) }),
  {
    handleSubmit: sendData,
    handleClick: validateDate,
  },
)(MyComponent)
```

It works for all the cases with the form:

```js
dispatch => bindActionCreators(actionsObject, dispatch);
```

It won't work for cases like this:

```js
// this
export default connect(
  state => ({ foo: getFoo(state) }),
  (dispatch, props) =>
    bindActionCreators(
      {
        handleSubmit: sendData(props.foo),
      },
      dispatch,
    ),
)(MyComponent)

// or this
export default connect(
  state => ({ foo: getFoo(state) }),
  (dispatch) => ({
    actionSet: bindActionCreators({ action }, dispatch),
    actionSet2: bindActionCreators({ otherAction }, dispatch),
  }),
)(MyComponent)
```
