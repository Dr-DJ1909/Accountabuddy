import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeWrapper from './HomeWrapper';
import TasksWrapper from './TasksWrapper';
import SettingsWrapper from './SettingsWrapper';
const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeWrapper,
    Tasks: TasksWrapper,
    Settings: SettingsWrapper,
  },
  {
    initialRouteName: 'Home'
  }
)
const AppContainer = createAppContainer(bottomTabNavigator);
export default class NavWrapper extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
