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
    let docRef = firebase
      .firestore()
      .collection('Friendships')
      .doc(key);
    const friendList = [];
    await docRef.get();
    return friendList;
  } catch (error) {
    console.log('error', error);
  }
}
