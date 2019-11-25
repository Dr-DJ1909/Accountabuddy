import firebase from 'firebase';
import '@firebase/firestore';
import * as Google from 'expo-google-app-auth';
import { AsyncStorage } from 'react-native'
import { GoogleID } from '../../ApiKeys'


export function newUser(user) {
  firebase
    .firestore()
    .collection('Users')
    .doc(user.uid)
    .set({
      email: user.email,
    })
    .then(console.log('success'))
    .catch(error => {
      console.log('error', error);
    });
}

export function googleUser(user) {
  firebase
    .firestore()
    .collection('Users')
    .doc(user.id)
    .set({
      email: user.email,
    })
    .then(console.log('success'))
    .catch(error => {
      console.log('error', error);
    });
}

// export function updateUser(userKey, ) {
//   firebase
//     .firestore()
//     .collection('users')
//     .doc(userKey)
//     .update({
//     });
// }

export function loginUser(email, password) {
  let loggedInUser = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => { return user.user.uid })
  return loggedInUser

}

export function signUpUser(email, password) {
  try {
    if (password < 6) {
      alert('Please enter at least 6 characters');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log('success` in signup', userInfo.user)
        newUser(userInfo.user)
      })

  } catch (err) {
    console.log(err.toString());
  }
}

export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      // androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId: GoogleID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log("google logged in", result.user.id)
      const user = result.user
      googleUser(user)
      return { success: result.accessToken };
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: e };
  }
}

