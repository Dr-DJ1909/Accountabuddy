import firebase from 'firebase';
import '@firebase/firestore';
import * as Google from 'expo-google-app-auth';
import {GoogleID} from '../../ApiKeys';

async function newUser(user) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        email: user.email,
        UserName:'',
        pet:{Name:'Kitty',ChoresHP:1,ExerciseHP:1, OtherHP:1},
        completedTasks:[],
        incompleteTasks:[],
        failedTasks:[],
      })
      console.log('info in newUser', user)

  } catch (error) {
    console.log('error', error);
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
    console.log('in signup user route', loggedInUser.user);
    await newUser(loggedInUser.user);
    return loggedInUser.user.uid;
  } catch (err) {
    console.log(err.toString());
  }
}

export async function googleUser(user) {
  try {
    await firebase
      .firestore()
      .collection('Users')
      .doc(user.id)
      .set({
        email: user.email,
        UserName: '',
        pet: {Name: 'kitty', ChoreHP: 1, GymHP: 1},
        tasks: []
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
    // console.log(user)
    return user.data(); //returns object
  } catch (error) {
    console.log(error);
  }
}

// export function updateUser(userKey, ) {
//   firebase
//     .firestore()
//     .collection('users')
//     .doc(userKey)
//     .update({
//     });
// }

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
      console.log('google logged in', result);
      const user = result.user;
      googleUser(user);
      // return { success: result.accessToken };
      return result;
    } else {
      return {cancelled: true};
    }
  } catch (e) {
    return {error: e};
  }
}
