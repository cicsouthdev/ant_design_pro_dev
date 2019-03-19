import { queryReport } from '@/services/report';


export default {
  namespace: 'report',

  state: {
    data: {
      list: [],
      warningMsg: '',
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },

}
