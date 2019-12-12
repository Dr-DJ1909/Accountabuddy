import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {createAppContainer} from 'react-navigation';
import HomeWrapper from './HomeWrapper';
import TasksWrapper from './TasksWrapper';
import SettingsWrapper from './SettingsWrapper';
import SocialWrapper from './SocialWrapper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeWrapper,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={23} color={tintColor} />
        )
      }
    },
    Tasks: {
      screen: TasksWrapper,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="list" size={23} color={tintColor} />
        )
      }
    },
    Social: {
      screen: SocialWrapper,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="users" size={23} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: SettingsWrapper,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="settings" size={23} color={tintColor} />
        )
      }
    }
  },
  {
    activeColor: '#CFDEE7',
    inactiveColor: '#4472CA',
    barStyle: {
      backgroundColor: '#0A369D'
    },
    initialRouteName: 'Home',
    backBehavior: 'none',
    resetOnBlur: true
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class NavWrapper extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    );
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  render() {
    return <AppContainer />;
  }
}
