import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDefaultProps } from 'recompose';
import { withIntl } from 'ha/i18n';

import { getFoo, getBar } from '../selectors';
import { submitData } from '../actions';

import MyComponent from '../components/MyComponent';

const enhance = compose(
  withDefaultProps({ foo: 'foo', bar: 'bar' }),
  connect(
    state => ({
      foo: getFoo(state),
      bar: getBar(state),
    }),
    {
      handleClick: submitData,
    },
  ),
  withIntl,
);

export default enhance(MyComponent);
