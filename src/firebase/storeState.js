import { db } from './index';

const mergeState = (initialState, persistedState) => (persistedState
  ? { ...initialState, ...persistedState }
  : initialState);
const isArray = Array.isArray || (Array.isArray = function (a) { return `${a}` !== a && {}.toString.call(a) === '[object Array]'; });

const typeOf = (thing) => {
  if (!thing) return 'void';

  if (isArray(thing)) {
    if (!thing.length) return 'void';
    return 'array';
  }

  return typeof thing;
};
const getSubset = (obj, paths) => {
  const subset = {};

  paths.forEach((key) => {
    const slice = obj[key];
    if (slice) subset[key] = slice;
  });

  return subset;
};

const createSlicer = (paths) => {
  switch (typeOf(paths)) {
    case 'void':
      return (state) => state;
    case 'string':
      return (state) => getSubset(state, [paths]);
    case 'array':
      return (state) => getSubset(state, paths);
    default:
      return console.error('Invalid paths argument, should be of type String, Array or Void');
  }
};


export default function storeState(paths, config) {
  const cfg = {
    key: 'redux',
    collectionName: 'items',
    merge: mergeState,
    slicer: createSlicer,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    ...config,
  };

  const {
    key,
    collectionName,
    merge,
    slicer,
    serialize,
    deserialize,
  } = cfg;

  return (next) => (reducer, initialState, enhancer) => {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }

    let persistedState;
    let finalInitialState;

    try {
      persistedState = deserialize(localStorage.getItem(key));
      finalInitialState = merge(initialState, persistedState);
    } catch (e) {
      console.warn('Failed to retrieve initialize state from localStorage:', e);
    }

    const store = next(reducer, finalInitialState, enhancer);
    const slicerFn = slicer(paths);

    // // DBを監視
    let isUpdate = false;
    let unsubscribe;
    try {
      db.collection(collectionName).doc(key)
        .onSnapshot((doc) => {
          // 変更があった時にデータが返される
          const { sprints, datas } = doc.data();
          if (sprints && datas) {
            const payload = { sprints, datas };
            console.log('sp', sprints);
            console.log('dt', datas);
            store.dispatch({ type: 'UPDATE_DATA', payload });

            // updateのdispatchを読んだことを明示
            isUpdate = true;
          }
          console.log('Current data: ', doc.data());
        });
    } catch (e) {
      unsubscribe();
      console.log(e);
    }

    store.subscribe(() => {
      const state = store.getState();
      const subset = slicerFn(state);
      console.log(store);

      try {
        localStorage.setItem(key, serialize(subset));
        console.log(state.lastAction);
        // onSnapshotで変更された値を再度投げないようにブロック
        if (!isUpdate) {
          db.collection(collectionName).doc(key).set(subset);
        }
        isUpdate = false;
      } catch (e) {
        console.warn('Unable to persist state to localStorage:', e);
      }
    });


    return store;
  };
}
