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
        [friendId]: true
      });
    console.log('info in newUser', user);
  } catch (error) {
    console.log('error', error);
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
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
