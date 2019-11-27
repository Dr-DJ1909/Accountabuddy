import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../styles';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { updateTaskThunk, deleteTaskThunk, failedTaskThunk } from '../store/user';
import TasksHeader from '../components/TasksHeader';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {name: 'Do Laundry', category: 'Chores', completion: false},
        {name: 'Workout', category: 'Exercise', completion: false},
        {name: 'Call Mom', category: 'Social', completion: false}
      ]
    };
    this.complete.bind(this);
    this.delete.bind(this);
    this.failed.bind(this)
  }
  complete(CompletedTask) {
    console.log('are you here?', CompletedTask);
    this.props.updateTaskAction(CompletedTask)
  }
  delete(unwantedTask){
    console.log('unwantedTaskHere', unwantedTask)
    this.props.deleteTaskAction(unwantedTask)
  }
  failed(failedTask){
    console.log('failedTaskHere', failedTask)
    this.props.failedTaskAction(failedTask)
  }


  render() {
    return (
      <PageWrapperView>
        <TasksHeader />
        <FlatList
          style={{flex: 2, width: '100%'}}
          data={this.props.incompleteTasks}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TaskItem
                item={item}
                style={{flex: 1}}
                index={index}
                complete={() =>{this.complete(item)}}
                delete = {() =>{this.delete(item)}}
                failed = {()=>{this.failed(item)}}
                addTask={this.addTask}
              />
            );
          }}
        />
      </PageWrapperView>
    );
  }
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
        marginBottom: '5%'
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20
  },
  subheadText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '800',
    textAlign: 'center'
  },
  formView: {
    flex: 1
  },
  textInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
    borderColor: '#AAE56B',
    backgroundColor: '#fafafa',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 400,
    alignSelf: 'center'
  },
  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#2DD1B0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  addTaskButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: 'yellow',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  buttonText: {
    fontSize: 24,
    color: '#111'
  },
  taskText: {
    fontSize: 20,
    // fontFamily: 'Helvetica'
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    incompleteTasks: state.user.user.incompleteTasks
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: () => dispatch(getUserThunk()),
    updateTaskAction:(task) => dispatch(updateTaskThunk(task)),
    deleteTaskAction:(task) => dispatch(deleteTaskThunk(task)),
    failedTaskAction:(task) => dispatch(failedTaskThunk(task))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (TaskList);

