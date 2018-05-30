import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFoo, getBar } from '../selectors';
import MyComponent from '../components';

export default connect(
  state => ({
    foo: getFoo(state),
    bar: getBar(state),
  }),
  dispatch => bindActionCreators({}, dispatch),
)(MyComponent);
