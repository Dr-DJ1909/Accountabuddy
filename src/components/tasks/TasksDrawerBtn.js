import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

class TasksDrawerBtn extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.trigger}
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer())
        }}
      >
        <Icon
          name="menu"
          size={23}
          color='#fff'
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 27.5,
    borderRadius: 30,
    width: 60,
    height: 60,
  }
});

export default withNavigation(TasksDrawerBtn);
