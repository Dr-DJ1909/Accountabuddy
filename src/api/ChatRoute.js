import firebase from 'firebase';
import '@firebase/firestore';



export async function newMessage(chatRoom, messageObject) {
  try {
    await firebase
      .firestore()
      .collection('Chat')
      .doc(chatRoom)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageObject)
      })
  } catch (error) {
    console.error(error)
  }
}

export async function previousMessages(chatRoom) {
  try {
    let previousMessages = await firebase
      .firestore()
      .collection('Chat')
      .doc(chatRoom)
      .get()
    return previousMessages.data()
  } catch (error) {
    console.error(error)
  }
}




