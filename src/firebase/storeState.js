import { db } from './index';


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
    slicer: createSlicer,
    ...config,
  };

  const {
    key,
    collectionName,
    slicer,
  } = cfg;

  return (next) => (reducer, initialState, enhancer) => {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }

    const store = next(reducer, initialState, enhancer);
    const slicerFn = slicer(paths);

    // // DBを監視
    let unsubscribe;
    try {
      db.collection(collectionName).doc(key)
        .onSnapshot((doc) => {
          // 変更があった時にデータが返される
          const { sprints, datas, updatedUid } = doc.data();
          if (sprints && datas) {
            const payload = { sprints, datas, updatedUid };
            const state = store.getState();

            // 自身の更新を再度投げないようにブロック
            if (updatedUid !== state.loginUser.uid) {
              store.dispatch({ type: 'UPDATE_DATA', payload });
            }
          }
        });
    } catch (e) {
      unsubscribe();
      console.warn(e);
    }

    store.subscribe(() => {
      const state = store.getState();
      const subset = slicerFn(state);

      try {
        // onSnapshotで変更された値を再度投げないようにブロック = 自身の更新のみDBに入れる
        if (subset.updatedUid === state.loginUser.uid) {
          db.collection(collectionName).doc(key).set(subset);
        }
      } catch (e) {
        console.warn('Unable to persist state to firestore:', e);
      }
    });


    return store;
  };
}
