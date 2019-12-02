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
  } catch (error) {
    console.log('error', error);
  }
}

export async function requestFriend(user, friendId) {
  try {
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(user)
      .update({
        [friendId]: true
      });
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

export async function userPendingList(user) {
  try {
    await firebase
      .firestore()
      .collection('FriendRequest')
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

export async function getPendingList(key) {
  try {
    let friendsList = [];
    let data = '';
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(key)
      .get()
      .then(function(doc) {
        console.log(doc.data());
        data = doc.data();
      });
    for (let key in data) {
      let friend = await getUser(key);
      friend = {...friend, uId: key};
      friendsList.push(friend);
    }
    return friendsList;
  } catch (error) {
    console.log('error', error);
  }

export async function ChatLog(){

}
