import React, { Component } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

export function newPet(userKey, petName){

   firebase
  .firestore()
    .collection("Users")
    .doc(userKey)
    .update({
      pet: {Name:petName}
    })
    .then(console.log('success'))
    .catch((error) =>{
      console.log(error)
    })

}
