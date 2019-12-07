import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from '../screens/Home';
import {Text} from 'react-native';

class HomeWrapper extends Component {
  constructor(props) {
    super(props);
    this.pressAdd = this.pressAdd.bind(this);
  }

  pressAdd() {
    const {navigate} = this.props.navigation;
    navigate('AddTask');
  }

  render() {

    let petName = this.props.user ? this.props.user.pet.Name : <Text />;
    let username = this.props.user ? this.props.user.UserName : <Text />;

    return <Home petName={petName} username={username} pressAdd={this.pressAdd} />;
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps, null)(HomeWrapper);
