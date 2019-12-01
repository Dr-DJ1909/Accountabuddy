import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../screens/Home';
import { Text } from 'react-native';

class HomeWrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('this.props', this.props)
    // let petName = this.props.user ? this.props.user.pet.Name : <Text />

    return (
      <Home />
    )
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user
  }
}
export default connect(
  mapStateToProps,
  null)
  (HomeWrapper);

