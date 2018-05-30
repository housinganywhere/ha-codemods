import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { sendData } from '../actions';
import { getFoo } from '../selectors';
import MyComponent from '../components/MyComponent';

export default connect(
  state => ({ foo: getFoo(state) }),
  (dispatch, { foo }) =>
    bindActionCreators(
      {
        handleSubmit: action(foo),
      },
      dispatch,
    ),
)(MyComponent);
