import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { withIntl } from 'ha/i18n'

import { getFoo, getBar } from '../selectors'
import { submitData } from '../actions'

import MyComponent from '../components/MyComponent'

const enhance = compose(
  connect(
    state => ({
      foo: getFoo(state),
      bar: getBar(state),
    }),
    dispatch =>
      bindActionCreators(
        {
          handleClick: submitData,
        },
        dispatch,
      ),
  ),
  withIntl,
)

export default enhance(MyComponent)
