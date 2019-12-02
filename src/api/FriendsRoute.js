import firebase from 'firebase';
import '@firebase/firestore';
import {getUser} from './UserRoute';

export async function newFriend(user, friendId) {
  try {
    await firebase
      .firestore()
      .collection('Friendships')
      .doc(user)
      .update({
        [friendId]: 'noChat'
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function addChatRoom(user, friendId, chatRoom){
  try {
    await firebase
    .firestore()
    .collection('Friendships')
    .doc(user)
    .update({
      [friendId]:chatRoom
    })
  } catch (error) {
    console.error(error)
  }
}


export async function userFriendList(user) {
  try {
    await firebase
      .firestore()
      .collection('Friendships')
      .doc(user.uid)
      .set({});
  } catch (error) {
    console.log('error', error);
  }
}

export async function getFriendList(key) {
  try {
    let friendsList = [];
    let data = '';
    await firebase
      .firestore()
      .collection('Friendships')
      .doc(key)
      .get()
      .then(function(doc) {
        console.log(doc.data());
        data = doc.data();
      });
    for (let key in data) {
      let friend = await getUser(key);
      friendsList.push(friend);
    }
    return friendsList;
  } catch (error) {
    console.log('error', error);
  }
}


export async function ChatLog(){

}
