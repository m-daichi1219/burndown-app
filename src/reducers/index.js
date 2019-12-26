import EDIT_TASK from '../constants/action-types';

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
};

function rootReducer(state = initialState, action) {
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


  return state;
}

export default rootReducer;
