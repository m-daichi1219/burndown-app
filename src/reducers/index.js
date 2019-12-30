import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY, ADD_SPRINT, DELETE_SPRINT,
} from '../constants/action-types';

const initialState = {
  // TEST DATA
  datas: [
    {
      title: 'title1', point: '12', sprint: '1', id: 'data1',
    },
    {
      title: 'title2', point: '8', sprint: '2', id: 'data2',
    },
    {
      title: 'title3', point: '13', sprint: '2', id: 'data3',
    },
    {
      title: 'title4', point: '22', sprint: '', id: 'data4',
    },
    {
      title: 'title5', point: '14', sprint: '', id: 'data5',
    },
    {
      title: 'title6', point: '12', sprint: '', id: 'data6',
    },
    {
      title: 'title7', point: '8', sprint: '', id: 'data7',
    },
    {
      title: 'title8', point: '13', sprint: '', id: 'data8',
    },
    {
      title: 'title9', point: '22', sprint: '', id: 'data9',
    },
    {
      title: 'title10', point: '14', sprint: '', id: 'data10',
    },
  ],
  sprints: [
    {
      id: 'id1',
      velocity: '12',
    },
    {
      id: 'id2',
      velocity: '10',
    },
    {
      id: 'id3',
      velocity: '13',
    },
    {
      id: 'id4',
      velocity: '16',
    },
    {
      id: 'id5',
      velocity: '15',
    },
    {
      id: 'id6',
      velocity: '12',
    },
    {
      id: 'id7',
      velocity: '13',
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
  const id = index + 1;
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
        title: '', point: '', sprint: '', id: '',
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
        id: `id${state.sprints.length}`,
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
