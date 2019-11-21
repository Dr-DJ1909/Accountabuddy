import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

export async function newTask(taskInfo, user) {
  await firebase
    .firestore()
    .collection('Tasks')
    .doc(user.uid)
    .set(
      tasks.push({
        taskName: taskInfo.taskName,
        taskType: taskInfo.taskType,
        taskStatus: taskInfo.taskStatus,
      })
    )
    .then(console.log('New Task Set'))
    .catch(error => {
      console.log(error);
    });
}
