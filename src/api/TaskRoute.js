import React, {Component} from 'react';
import ApiKeys from './ApiKeys.js'
import firebase from 'firebase'
import '@firebase/firestore';


export async function newTask(taskInfo, user){
  await firebase.firestore()
    .collection("Tasks")
    .doc(Task)
    .set({
      taskName: taskInfo.taskName,
      taskType: taskInfo.taskType,
      taskStatus: taskInfo.taskStatus,
      userId: user.uid
    })
    .then(console.log('New Task Set'))
    .catch((error) =>{
      console.log(error)
    })
}


