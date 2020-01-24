import firebase from 'firebase/app';
import 'firebase/firestore';
import ui from './ui';

// firebase使用準備
firebase.initializeApp(require('./config'));

export const db = firebase.firestore();
export const auth = firebase.auth();
export const loginUi = ui;
export const fb = firebase;
// サインアウト時の動作確認
// auth.signOut();
