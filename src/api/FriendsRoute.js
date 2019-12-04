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
        return chatRoom
   } catch (error) {
     console.error(error)
   }
 }

export async function requestFriend(user, friendId) {
  //user is targetId, friendId is loggedIn user Id
  try {
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(user)
      .update({
        [friendId]: 'pending'
      });
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(friendId)
      .update({
        sent: firebase.firestore.FieldValue.arrayUnion(user)
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function denyResponse(user, friendId) {
  try {
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(user)
      .update({
        [friendId]: 'denied'
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function acceptResponse(user, friendId) {
  try {
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(user)
      .update({
        [friendId]: 'accepted'
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
export async function getRoom(user,friend){
  try {
    console.log('what is friend here', friend)
    let friends = await firebase
    .firestore()
    .collection('Friendships')
    .doc(user)
    .get()
    console.log('what do i get back?',friends.data())
    console.log('friend room', friends.data()[friend])
    return friends.data()[friend]
  } catch (error) {
    console.log(error)
  }
}

export async function getFriendList(userKey) {
  try {
    let friendsList = [];
    let data = '';
    await firebase
      .firestore()
      .collection('Friendships')
      .doc(userKey)
      .get()
      .then(function(doc) {
        data = doc.data();
      });
    for (let key in data) {
      let friend = await getUser(key);
       let roomKey = await getRoom(userKey,key)
       friend.roomKey = roomKey
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
        data = doc.data();
      });
    for (let key in data) {
      let friend = await getUser(key);
      friend = {...friend, uId: key};
      if (data[friend.uId] === 'pending') {
        friendsList.push(friend);
      }
    }
    return friendsList;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getRequestList(key) {
  try {
    let friendsList = [];
    let data = '';
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(key)
      .get()
      .then(function(doc) {
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
}

export async function getSentList(key) {
  try {
    let userData = '';
    await firebase
      .firestore()
      .collection('FriendRequest')
      .doc(key)
      .get()
      .then(function(doc) {
        userData = doc.data();
      });
    return userData.sent;
  } catch (error) {
    console.log('error in getSentList', error);
  }
}

// export async function ChatLog(){

// }
