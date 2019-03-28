import {queryRepairCompany} from '@/services/process'

export default {
  namespace: 'repairCompany',
  state: {
    repairCompanyList:{
      list:[],
      pagination: {
      },
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRepairCompany, payload);
      yield put({
        type: 'saveRepairCompany',
        payload: response,
      });
    },
    *add(){

    },
    *update(){

    },
    *delete(){

    },
  },
  reducers: {
    saveRepairCompany(state, action) {
      return {
        ...state,
        repairCompanyList: action.payload,
      };
    },
  },

}
