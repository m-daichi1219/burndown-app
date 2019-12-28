import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY,
} from '../constants/action-types';

const initialState = {
  // TEST DATA
  datas: [
    {
      title: 'title1', point: '1', endDate: '2019-12-21', id: 'data1',
    },
    {
      title: 'title2', point: '2', endDate: '2019-12-22', id: 'data2',
    },
    {
      title: 'title3', point: '3', endDate: '2019-12-23', id: 'data3',
    },
    {
      title: 'title4', point: '4', endDate: '2019-12-24', id: 'data4',
    },
    {
      title: 'title5', point: '5', endDate: '2019-12-25', id: 'data5',
    },
  ],
  sprints: [
    {
      id: 'id1',
      velocity: 10,
    },
    {
      id: 'id2',
      velocity: 10,
    },
    {
      id: 'id3',
      velocity: '',
    },
    {
      id: 'id4',
      velocity: '',
    },
    {
      id: 'id5',
      velocity: '',
    },
    {
      id: 'id6',
      velocity: '',
    },
    {
      id: 'id7',
      velocity: '',
    },
    {
      id: 'id8',
      velocity: '',
    },
    {
      id: 'id9',
      velocity: '',
    },
    {
      id: 'id10',
      velocity: '',
    },
    {
      id: 'id11',
      velocity: '',
    },
    {
      id: 'id12',
      velocity: '',
    },
    {
      id: 'id13',
      velocity: '',
    },
    {
      id: 'id14',
      velocity: '',
    },
    {
      id: 'id15',
      velocity: '',
    },
  ],
};

// taskの配列にidを振りなおすヘルパー関数
const setTaskIDHelper = (array) => Object.assign([], array.map((data, index) => {
  const id = index;
  return { ...data, id: `data${id}` };
}));

function rootReducer(state = initialState, action) {
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
        title: '', point: '', endDate: '', id: '',
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

  // 初期表示
  return state;
}

export default rootReducer;
