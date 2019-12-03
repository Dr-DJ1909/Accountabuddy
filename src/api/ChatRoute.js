import firebase from 'firebase';
import '@firebase/firestore';


export async function newChat() {
 let chatRoom =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  try {
    await firebase
    .firestore()
    .collection('Chat')
    .doc(chatRoom)
    .set({
      messages:[]
      })
      return randomString
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

export async function previousMessages(){
  try {
    let previousMessages = await firebase
    .firestore()
    .collection('Chat')
    .doc('R9jeX5rLvaRDeUF0rf1R')
    .get()
    return previousMessages.data()
  } catch (error) {
    console.error(error)
  }
}

export async function getNewMessages(){
  try {
     await firebase
    .firestore()
    .collection('Chat')
    .doc('R9jeX5rLvaRDeUF0rf1R')
    .onSnapshot((doc) =>{
      let changes = doc.data()
      console.log('changes in snapshot',changes)

    })
    let previousMessages = await firebase
    .firestore()
    .collection('Chat')
    .doc('R9jeX5rLvaRDeUF0rf1R')
    .get()
    return previousMessages.data()
  } catch (error) {
    console.error(error)
  }
}




