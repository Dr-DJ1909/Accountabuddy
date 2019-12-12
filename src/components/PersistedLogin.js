import React from 'react';
import {connect} from 'react-redux';
import {PageWrapperView, HeaderText} from '../styles';
import {getUser} from '../api/UserRoute';
import {getUserThunk, getUserKeyThunk} from '../store/user';
import NavWrapper from './NavWrapper';

class PersistedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  persistedUser = async userKey => {
    try {
      const currentUser = await getUser(userKey);
      this.props.getUserAction(currentUser);
      this.props.getUserKey(userKey);
      this.setState({loaded: true});
    } catch (err) {
      console.log(err.toString());
    }
  };

  componentWillMount() {
    this.persistedUser(this.props.userKey);
  }

  render() {
    let display = this.state.loaded ? (
      <NavWrapper />
    ) : (
      <PageWrapperView>
        <HeaderText>Loading...</HeaderText>
        <HeaderText>(*＾▽＾)／</HeaderText>
      </PageWrapperView>
    );
    return display;
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: user => dispatch(getUserThunk(user)),
    getUserKey: userKey => dispatch(getUserKeyThunk(userKey))
  };
};

export default connect(null, mapDispatchToProps)(PersistedLogin);
