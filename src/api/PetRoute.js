import React, { Component } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

export async function newPetName(userKey, petName){
  try {
    const newPet = await firebase
    .firestore()
    .collection('Users')
    .doc(userKey)
    .update({
      'pet.Name':petName
    })
    return newPet
  } catch (error) {
    console.error(error)
  }
}

export async function HPChange(userKey, petObject){
  try {
    const newPet = await firebase
    .firestore()
    .collection('Users')
    .doc(userKey)
    .update({
      pet:petObject
    })
  } catch (error) {
    console.error(error)
  }
}




// export function newPet(userKey, petName){

//    firebase
//   .firestore()
//     .collection("Users")
//     .doc(userKey)
//     .update({
//       pet: {Name:petName}
//     })
//     .then(console.log('success'))
//     .catch((error) =>{
//       console.log(error)
//     })

// }
