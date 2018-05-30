import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { close, open } from '../actions';
import { isOpen } from '../selectors';

const getMapStateToProps = R.memoize(modalName => state => ({
  isOpen: isOpen(modalName, state),
}));

const getMapDispatchToProps = R.memoize(modalName => dispatch =>
  bindActionCreators(
    {
      handleOpen: R.partial(open, [modalName]),
      handleClose: R.partial(close, [modalName]),
    },
    dispatch,
  ),
);

const name = 'some-name';

export default connect(
  getMapStateToProps(name),
  getMapDispatchToProps(name),
)(WithModal);
