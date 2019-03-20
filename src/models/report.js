import { queryReport, queryReprotInit } from '@/services/report';


export default {
  namespace: 'report',

  state: {
    data: {
      list: [],
      warningMsg: '',
    },
    residences: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *init({payload}, {call, put}){
      const response = yield call(queryReprotInit);
      yield put({
        type: 'initData',
        payload: response,
      })
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    initData(state, action) {
      return {
        ...state,
        residences: action.payload,
      }
    }
  },

}
