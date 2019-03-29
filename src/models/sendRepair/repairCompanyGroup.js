import {queryRepairCompanyGroup, queryUnSelectedCompany} from '@/services/process'

export default {
  namespace: 'repairCompanyGroup',
  state: {
    repairCompanyGroupList:{
      list:[],
      pagination: {
      },
    },
    unSelectedCompany: [],
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
    *unSelectedCompanyFetch({ payload }, { call, put }) {
      const response = yield call(queryUnSelectedCompany, payload);
      yield put({
        type: 'saveUnSelectedCompany',
        payload: response,
      });
    }
  },
  reducers: {
    saveRepairCompanyGroup(state, action) {
      return {
        ...state,
        repairCompanyGroupList: action.payload,
      };
    },
    saveUnSelectedCompany(state, action){
      return {
        ...state,
        unSelectedCompany: action.payload
      }
    }
  },

}
