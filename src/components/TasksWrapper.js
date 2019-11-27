import React, {Component} from 'react';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../styles';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {CheckBox} from 'native-base';
import {newTask} from '../api/TaskRoute';
import Swipeout from 'react-native-swipeout';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AddTask from './AddTask';
import TaskList from '../screens/TaskList';
import TaskExercise from '../screens/TaskExercise';
import TasksDrawerBtn from './TasksDrawerBtn';
import Icon from 'react-native-vector-icons/Feather';

// const TasksWrapper = props => {

//   toggleDrawer = () => {
//     props.navigation.dispatch(DrawerActions.toggleDrawer());
//   };

//   return (
//     <PageWrapperView>

//       <TasksDrawerNav />
//       {/* <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           <Icon name="align-justify" size={23} />
//         </TouchableOpacity>
//       </View> */}
//       {/* <Icon name="menu" size={23} /> */}
//       {/* <TaskExercise /> */}
//     </PageWrapperView>
//   );
// }

const TasksWrapper = createDrawerNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: {
      drawerLabel: "Current task list"
    }
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: {
      drawerLabel: "Add a new task"
    }
  },
  TaskExercise: {
    screen: TaskExercise,
    navigationOptions: {
      drawerLabel: "Exercise tasks"
    }
  },
},{
  initialRouteName: 'TaskList',
  drawerPosition: 'left',
	// // drawerWidth: WIDTH*0.83,
	// contentComponent: ({ navigation }) => {
	// 	return(<TasksDrawer navigation={navigation} />)}
});

// renderSeparator = () => {
//   return (
//     <View
//       style={{
//         height: 1,
//         width: '86%',
//         backgroundColor: '#CED0CE',
//         marginLeft: '14%',
//         marginBottom: '5%'
//       }}
//     />
//   );
// };


export default TasksWrapper;
