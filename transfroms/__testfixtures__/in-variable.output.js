import { connect } from 'react-redux';

import { getFoo, getBar } from '../selectors';
import { submitData } from '../actions';

import MyComponent from '../components/MyComponent';

const matStateToProps = state => ({
  foo: getFoo(state),
  bar: getBar(state),
});

const mapDispatchToProps = {
  handleClick: submitData,
};

export default connect(
  matStateToProps,
  mapDispatchToProps,
)(MyComponent);
