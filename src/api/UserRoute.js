import React, { Component } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

// export async function newUser(userInfo){
//   await firebase.firestore()
//     .collection("Users")
//     .doc(userInfo.name)
//     .set({
//       userName:userInfo.userName,
//       passWord:userInfo.passWord,
//       displayName:userInfo.displayName,
//       profileImg:userInfo.profileImg,
//       email:userInfo.email,
//     })
//     .then(console.log('User Added'))
//     .catch((error) =>{
//       console.log(error)
//     })
// }
export async function newUser(user) {
  await firebase
    .firestore()
    .collection('Users')
    .doc(user.uid)
    .set({
      lastLoginAt: user.lastLoginAt,
    })
    .then(console.log('success'))
    .catch(error => {
      console.log('error', error);
    });
}

export async function updateUser(newInfo, user) {
  await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      userName: newInfo.userName,
      passWord: newInfo.passWord,
      displayName: newInfo.displayName,
      profileImg: newInfo.profileImg,
      email: newInfo.email,
    });
}
