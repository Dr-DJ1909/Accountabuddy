import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import SettingsInfo from './SettingsInfo';
import SettingsHome from '../screens/SettingsHome';

const SettingsWrapper = createSwitchNavigator({
  Top: {
    screen: SettingsHome,
  },
  ChangeInfo: {
    screen: SettingsInfo,
  }
},{
  initialRouteName: 'Top',
  backBehavior: 'initialRoute'
});


export default SettingsWrapper;
