import {queryRepairCompanyGroup} from '@/services/process'

export default {
  namespace: 'repairCompanyGroup',
  state: {
    repairCompanyGroupList:{
      list:[],
      pagination: {
      },
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRepairCompanyGroup, payload);
      yield put({
        type: 'saveRepairCompanyGroup',
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
    saveRepairCompanyGroup(state, action) {
      return {
        ...state,
        repairCompanyGroupList: action.payload,
      };
    },
  },

}
