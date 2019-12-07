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
import {createDrawerNavigator} from 'react-navigation-drawer';
import AddTask from './tasks/AddTask';
import TaskList from './tasks/TaskList';
import TaskExercise from '../screens/tasks/TaskExercise';
import TaskChores from '../screens/tasks/TaskChores';
import TaskSocial from '../screens/tasks/TaskSocial';
import TaskListCompleted from './tasks/TaskListCompleted';
import TasksDrawerBtn from './tasks/TasksDrawerBtn';
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

const TasksWrapper = createDrawerNavigator(
  {
    TaskList: {
      screen: TaskList,
      navigationOptions: {
        drawerLabel: 'Current Task List'
      }
    },
    AddTask: {
      screen: AddTask,
      navigationOptions: {
        drawerLabel: 'Add A New Task'
      }
    },
    TaskExercise: {
      screen: TaskExercise,
      navigationOptions: {
        drawerLabel: 'Exercise Tasks'
      }
    },
    TaskChores: {
      screen: TaskChores,
      navigationOptions: {
        drawerLabel: 'Chores Tasks'
      }
    },
    TaskSocial: {
      screen: TaskSocial,
      navigationOptions: {
        drawerLabel: 'Social Tasks'
      }
    },
    TaskListCompleted: {
      screen: TaskListCompleted,
      navigationOptions: {
        drawerLabel: 'Task History'
      }
    }
  },
  {
    initialRouteName: 'TaskList',
    drawerPosition: 'left',
    unmountInactiveRoutes: true
    // // drawerWidth: WIDTH*0.83,
    // contentComponent: ({ navigation }) => {
    // 	return(<TasksDrawer navigation={navigation} />)}
  }
);

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
