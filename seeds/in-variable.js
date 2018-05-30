import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFoo, getBar } from '../selectors'
import { submitData } from '../actions'

import MyComponent from '../components/MyComponent'

const matStateToProps = state => ({
  foo: getFoo(state),
  bar: getBar(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClick: submitData,
    },
    dispatch,
  )

export default connect(
  matStateToProps,
  mapDispatchToProps,
)(MyComponent)
