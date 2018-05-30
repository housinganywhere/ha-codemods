import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFoo, getBar } from '../selectors';
import { submitData } from '../actions';

import MyComponent from '../components/MyComponent';

export const WhyExportTwice = connect(
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
)(MyComponent);

export default connect(
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
)(MyComponent);
