import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY, ADD_SPRINT,
  DELETE_SPRINT, UPDATE_DATA, INIT_USER,
} from '../constants/action-types';
import { initialData, initialState } from '../constants/initial-state';

const init = initialState;

// taskの配列にidを振りなおすヘルパー関数
const setTaskIDHelper = (array) => Object.assign([], array.map((data, index) => {
  const id = index + 1;
  return { ...data, id: `data${id}` };
}));

function rootReducer(state = init, action) {
  // タスク編集時
  if (action.type === EDIT_TASK) {
    return {
      ...state,
      datas: Object.assign([], state.datas.map((data) => {
        if (data.id === action.payload.id) {
          return { ...data, ...action.payload };
        }
        return data;
      })),
      updatedUid: state.loginUser.uid,
    };
  }

  // タスク削除時
  if (action.type === DELETE_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.filter((data) => (data.id !== action.payload.id))),
      updatedUid: state.loginUser.uid,
    };
  }

  // タスク追加時
  if (action.type === ADD_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.concat(initialData)),
      updatedUid: state.loginUser.uid,
    };
  }

  // velocity編集時
  if (action.type === EDIT_VELOCITY) {
    return {
      ...state,
      updatedUid: state.loginUser.uid,
      sprints: Object.assign([], state.sprints.map((sprint) => {
        if (sprint.id === action.payload.id) {
          return { ...sprint, ...action.payload };
        }
        return sprint;
      })),
    };
  }

  // sprint追加時
  if (action.type === ADD_SPRINT) {
    return {
      ...state,
      updatedUid: state.loginUser.uid,
      sprints: Object.assign([], state.sprints.concat({
        id: `id${state.sprints.length + 1}`,
        start: '',
        end: '',
        planningCapacity: '0',
        resultCapacity: '0',
        velocity: '',
      })),
    };
  }

  // sprint削除時
  if (action.type === DELETE_SPRINT) {
    return {
      ...state,
      sprints: Object.assign([], state.sprints.slice(0, state.sprints.length - 1)),
      updatedUid: state.loginUser.uid,
    };
  }

  // firestoreからデータ読込時
  if (action.type === UPDATE_DATA) {
    const { sprints, datas, updatedUid } = action.payload;
    return {
      ...state,
      sprints: sprints.map((x) => x),
      datas: datas.map((x) => x),
      updatedUid,
    };
  }

  // ログインユーザのUIDを保存
  if (action.type === INIT_USER) {
    const { uid } = action.payload;
    return {
      ...state,
      loginUser: { uid },
      updatedUid: uid,
    };
  }

  // 初期表示
  return state;
}

export default rootReducer;
