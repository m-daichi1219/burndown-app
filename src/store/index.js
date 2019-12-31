import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers/index';

const enhancer = compose(persistState(['datas', 'sprints'], { key: 'burndown-app' }));

const store = createStore(rootReducer, enhancer);

export default store;
