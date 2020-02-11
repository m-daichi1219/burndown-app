import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
// FirebaseUI config.
const uiConfig = {
  signInSuccessUrl: '/', // サインインが成功した後にユーザーをリダイレクトするURL。signInSuccessWithAuthResultがTrueの時必須
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID, // eslint-disable-line no-undef
  ],
  signInFlow: 'popup',
  tosUrl: '/agreement.html',
  privacyPolicyUrl() {
    window.location.assign('/privacy-policy.html');
  },
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // const { user } = authResult;
      // const { credential } = authResult;
      // const { isNewUser } = authResult.additionalUserInfo;
      // const { providerId } = authResult.additionalUserInfo;
      // const { operationType } = authResult;
      console.log('result', authResult);
      console.log('redirect', redirectUrl);
      return true; // true: リダイレクトする。 false: リダイレクトしない
    },
    signInFailure(error) {
      return handleUIError(error); // eslint-disable-line no-undef
    },
    uiShown() {
      // document.getElementById('loader').style.display = 'none'; // The widget is rendered. Hide the loader.
    },
  },
};

const start = (auth) => {
  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(auth); // eslint-disable-line no-undef
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
};

export default start;
