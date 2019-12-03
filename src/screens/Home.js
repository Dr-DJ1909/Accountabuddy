import React, {Component} from 'react';
import {Image} from 'react-native';
import {Header} from 'react-native-elements';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  TopHeaderText,
  TopHeader,
  Divider,
  DividerLarge
} from '../styles';
import HomePet from './HomePet';
import Icon from 'react-native-vector-icons/Feather';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    let petName = this.props ? this.props.petName : <Text />;
    let username = this.props ? this.props.username : null;
    let usernameDisplay = ((typeof username === 'string') && username.length && username.length > 20) ? `Hi!` : `Hi, ${username}!`;
    if (!username.length || username.length > 22) usernameDisplay = 'Hi!';
    return (
      <PageWrapperView>
        <TopHeader>
          <TopHeaderText>{usernameDisplay}</TopHeaderText>
        </TopHeader>
        <HeaderText>How is {petName} doing?</HeaderText>
        <Divider /><Divider />
        <HomePet />
      </PageWrapperView>
    );
  }
}

export default Home;
