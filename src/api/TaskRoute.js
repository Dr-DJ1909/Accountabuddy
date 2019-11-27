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
        incompleteTasks: firebase.firestore.FieldValue.arrayUnion(task)
      });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTasks(userId){
  try{
    let incompleteTasks = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .get(incompleteTasks)

    let completeTasks = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .get(incompleteTasks)

    return incompleteTasks.concat(completeTasks)
  }
  catch(error){
    console.error(error)
  }
}

export async function AllIncompleteTasks(userId){
  try{
    let allIncomplete = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .get(incompleteTasks)
    return allIncomplete
  }
  catch(error){
    console.error(error)
  }
}

export async function AllFailedTasks(userId){
  try {
    let allFailed = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .get(incompleteTasks)
    return allFailed
  } catch (error) {
    console.error(error)
  }
}

export async function AllCompleteTasks(userId){
  try {
    let allComplete = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .get(completedTasks)
    return allComplete
  }
  catch (error) {
    console.error(error)
  }
}

export async function TaskComplete(userId, task){
  try {
    let updatedTask = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .update({
      incompleteTasks:firebase.firestore.FieldValue.arrayRemove(task),
      completedTasks:firebase.firestore.FieldValue.arrayUnion(task)
    })
    return updatedTask
  } catch (error) {
    console.log(error)
  }
}

export async function TaskFailed(userId, task){
  try {
    let failedTask = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .update({
      incompleteTasks:firebase.firestore.FieldValue.arrayRemove(task),
      failedTasks:firebase.firestore.FieldValue.arrayUnion(task)
    })
    return failedTask
  } catch (error) {
    console.error(error)
  }
}


export async function deleteTask(userId, task){
  try {
    let deletedTask = await firebase
    .firestore()
    .collection('Users')
    .doc(userId)
    .update({
      incompleteTasks:firebase.firestore.FieldValue.arrayRemove(task)
    })
    return deletedTask
  } catch (error) {
    console.log(error)
  }
}
