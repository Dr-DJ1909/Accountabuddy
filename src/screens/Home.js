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
    let username = this.props ? this.props.username : <Text />;
    let usernameDisplay = (typeof username === 'string') && username.length > 20 ? `Hi!` : `Hi, ${username}!`
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
