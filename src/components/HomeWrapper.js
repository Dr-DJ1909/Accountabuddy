import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from '../screens/Home';
import {Text} from 'react-native';

class HomeWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let petName = this.props.userKey ? this.props.user.pet.Name : <Text />;
    let username = this.props.userKey ? this.props.user.UserName : <Text />;

    return <Home petName={petName} username={username}/>;
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    userKey:state.user.userKey
  };
};
export default connect(mapStateToProps, null)(HomeWrapper);
