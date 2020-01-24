import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers/index';
import storeState from '../firebase/storeState';
import { db } from '../firebase/index';

const key = 'burndown-app';
const collectionName = 'items';
const enhancer = compose(
  storeState(['datas', 'sprints', 'updatedUid'], { key, collectionName }),
  persistState(['datas', 'sprints'], { key: 'burndown-app' }),
);

const store = createStore(rootReducer, enhancer);

export default store;
