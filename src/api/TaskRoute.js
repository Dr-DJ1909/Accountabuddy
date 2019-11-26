import React, {Component} from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

export async function newTask(userId, task) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(userId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(task)
      });
  } catch (error) {
    console.error(error);
  }
}
