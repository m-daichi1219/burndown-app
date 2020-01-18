import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY, ADD_SPRINT,
  DELETE_SPRINT,
} from '../constants/action-types';
import initialState from '../constants/initial-state';

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
    };
  }

  // タスク削除時
  if (action.type === DELETE_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.filter((data) => (data.id !== action.payload.id))),
    };
  }

  // タスク追加時
  if (action.type === ADD_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.concat({
        title: '', point: '', sprint: '', id: '', tag: 'draggable-yellow',
      })),
    };
  }

  // velocity編集時
  if (action.type === EDIT_VELOCITY) {
    return {
      ...state,
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
      sprints: Object.assign([], state.sprints.concat({
        id: `id${state.sprints.length + 1}`,
        velocity: '',
      })),
    };
  }

  // sprint削除時
  if (action.type === DELETE_SPRINT) {
    return {
      ...state,
      sprints: Object.assign([], state.sprints.slice(0, state.sprints.length - 1)),
    };
  }

  // 初期表示
  return state;
}

export default rootReducer;
