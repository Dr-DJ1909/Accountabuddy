import firebase from 'firebase';
import '@firebase/firestore';
import * as Google from 'expo-google-app-auth';
import { GoogleID } from '../../ApiKeys';
import { userFriendList, userPendingList } from '../api/FriendsRoute';
// import {debug} from 'util';

async function newUser(user) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        //users should start out with these documents initialized in firebase
        email: user.email,
        UserName: '',
        pet: { Name: 'Kitty', ChoresHP: 1, ExerciseHP: 1, SocialHP: 1 },
        completedTasks: [],
        incompleteTasks: [],
        failedTasks: [],
        bio: '',
        avatar: '',
        isDoingTutorial: true
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function renameUserName(userKey, userName) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(userKey)
      .update({
        UserName: userName
      });
  } catch (error) {
    console.error(error);
  }
}

export async function signUpUser(email, password) {
  try {
    if (password < 6) {
      alert('Please enter at least 6 characters');
      return;
    }
    let loggedInUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await newUser(loggedInUser.user);
    await userFriendList(loggedInUser.user);
    await userPendingList(loggedInUser.user);
    return loggedInUser.user.uid;
  } catch (err) {
    console.log(err.toString());
  }
}

async function googleUser(user) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        email: user.email,
        UserName: '',

        pet: {Name: 'Kitty', ChoresHP: 1, ExerciseHP: 1, SocialHP: 1},
        completedTasks: [],
        incompleteTasks: [],
        failedTasks: [],
        bio: '',
        avatar: '',
        isDoingTutorial: true

      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function getUser(userId) {
  try {
    let user = await firebase
      .firestore()
      .collection('Users')
      .doc(userId)
      .get();
    return user.data(); //returns user in object format
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(email, password) {
  try {
    let loggedInUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return loggedInUser.user.uid;
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      // androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId: GoogleID,
      scopes: ['profile', 'email']
    });

    if (result.type === 'success') {
      const user = result.user;
      googleUser(user);
      // return { success: result.accessToken };
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: e };
  }
}

export async function getUsers() {
  try {
    let users = [];
    await firebase
      .firestore()
      .collection('Users')
      .get()

      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          let obj = {
            uId: doc.id,
            email: doc.data().email,
            userName: doc.data().UserName
          };
          users.push(obj);
        });
      });
    return users;
  } catch (error) {
    console.log(error);
  }
}

//This function updates the 'bio' field on the user's object with the information passed in as 'newBio'
export async function updateBio(userId, newBio) {
  try {

    await firebase
      .firestore()
      .collection('Users')
      .doc(userId)
      .update({
        bio: newBio
      });
  } catch (error) {
    console.error(error);
  }
}

export async function finishedTutorial(userId) {
  try {

    await firebase
      .firestore()
      .collection('Users')
      .doc(userId)
      .update({
        isDoingTutorial: false
      });
  } catch (error) {
    console.error(error);
  }
}

export async function updateAvatar(userId, picUrl) {
  try {
    const avatarUrl = await firebase
      .firestore()
      .collection('Users')
      .doc(userId)
      .update({
        avatar: picUrl
      });
  } catch (error) {
    console.error(error);
  }
}
