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
    const friendList = [];
    // let data =
    await firebase
      .firestore()
      .collection('Friendships')
      .doc(key)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          let obj = {
            uId: doc.id
            // email: doc.data().email,
            // userName: doc.data().UserName
          };
          friendList.push(obj);
        });
      });
    // console.log(data.data());
    return friendList;
  } catch (error) {
    console.log('error', error);
  }
}
