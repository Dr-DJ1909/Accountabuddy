import firebase from 'firebase';
import '@firebase/firestore';


export async function newChat() {
  try {
    await firebase
    .firestore()
    .collection('Chat')
    .doc()
    .set({
      messages:[]
      })
  } catch (error) {
    console.error(error)
  }
}

export async function newMessage(messageObject) {
  try {
    await firebase
    .firestore()
    .collection('Chat')
    .doc('R9jeX5rLvaRDeUF0rf1R')
    .update({
      messages:firebase.firestore.FieldValue.arrayUnion(messageObject)
      })
  } catch (error) {
    console.error(error)
  }
}




