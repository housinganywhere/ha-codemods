import { connect } from 'react-redux';

import { getFoo, getBar } from '../selectors';
import MyComponent from '../components';

export default connect(
  state => ({
    foo: getFoo(state),
    bar: getBar(state),
  }),
  {},
)(MyComponent);
