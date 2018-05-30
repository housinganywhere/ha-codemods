import { connect } from 'react-redux';

import { getFoo, getBar } from '../selectors';
import { submitData } from '../actions';

import MyComponent from '../components/MyComponent';

export default connect(
  state => ({
    foo: getFoo(state),
    bar: getBar(state),
  }),
  {
    handleClick: submitData,
  },
)(MyComponent);
