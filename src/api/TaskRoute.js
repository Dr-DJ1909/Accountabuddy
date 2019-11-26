import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

export function newTask(userId, task) {
  firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion(task),
    })
    .then(console.log('New Task Set'))
    .catch(error => {
      console.log(error);
    });
}
