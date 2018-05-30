import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionOne, sendData } from '../actions';
import MyComponent from '../components/MyComponent';

class MyContainer extends React.Component {
  handleClick = bindActionCreators(sendData, this.props.dispatch);

  render() {
    return <MyComponent onClick={this.handleClick} />;
  }
}

const actionSet = {
  actionOne,
  actionTwo: sendData,
};

export const ContainerOne = connect(
  state => ({ value: state.foo.value }),
  dispatch => ({
    actionSetOne: bindActionCreators(actionSet, dispatch),
  }),
)(MyContainer);

export const ContainerTwo = connect(
  state => ({ value: state.foo.value }),
  dispatch => ({
    dispatch,
    ...bindActionCreators(
      {
        actionOne,
        sendData,
      },
      dispatch,
    ),
  }),
)(MyContainer);

export default connect(
  state => ({ value: state.foo.value }),
  dispatch => ({
    actionSetOne: bindActionCreators(actionSet, dispatch),
    actionSetTwo: bindActionCreators(actionSet, dispatch),
  }),
)(MyContainer);
