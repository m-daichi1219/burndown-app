import { EDIT_TASK, DELETE_TASK, ADD_TASK } from '../constants/action-types';

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
      sprint: 'Sprint1',
      velocity: 10,
    },
    {
      sprint: 'Sprint2',
      velocity: 10,
    },
    {
      sprint: 'Sprint3',
      velocity: '',
    },
    {
      sprint: 'Sprint4',
      velocity: '',
    },
    {
      sprint: 'Sprint5',
      velocity: '',
    },
    {
      sprint: 'Sprint6',
      velocity: '',
    },
    {
      sprint: 'Sprint7',
      velocity: '',
    },
    {
      sprint: 'Sprint8',
      velocity: '',
    },
    {
      sprint: 'Sprint9',
      velocity: '',
    },
    {
      sprint: 'Sprint10',
      velocity: '',
    },
    {
      sprint: 'Sprint11',
      velocity: '',
    },
    {
      sprint: 'Sprint12',
      velocity: '',
    },
    {
      sprint: 'Sprint13',
      velocity: '',
    },
    {
      sprint: 'Sprint14',
      velocity: '',
    },
    {
      sprint: 'Sprint15',
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

  // 初期表示
  return state;
}

export default rootReducer;
