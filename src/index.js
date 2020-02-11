import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import firebase from 'firebase/app';
import loginUi from './firebase/ui';
import * as serviceWorker from './serviceWorker';
import Store from './store/index';
import App from './component/App';

library.add(fab, fas, far);

function init() {
  render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

// firebase使用準備
firebase.initializeApp(require('./firebase/config'));

const auth = firebase.auth();

// 認証済かチェック
auth.onAuthStateChanged((payload) => {
  if (!payload) {
    loginUi(auth);
    return;
  }
  // const { uid } = payload;

  // 認証していたらレンダリング
  init();
});

// サインアウト時の動作確認
// auth.signOut();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
