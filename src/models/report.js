import { queryReport, queryReprotInit, searchBrand } from '@/services/report';


export default {
  namespace: 'report',

  state: {
    data: {
      list: [],
      warningMsg: '',
    },
    residences: [],
    reasons: [],
    brandAutoCompleteData:[],
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
    *searchBrand({payload}, {call, put}){
      const response = yield call(searchBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    initData(state, action) {
      const {residences, reasons} = action.payload;
      return {
        ...state,
        residences,
        reasons,
      }
    },
    saveBrand(state, action){
      return {
        ...state,
        brandAutoCompleteData: action.payload
      }
    }
  },

}
