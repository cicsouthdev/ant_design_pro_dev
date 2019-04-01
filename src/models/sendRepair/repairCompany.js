import {queryRepairCompany, querySendRepairCode, searchRepairCompany} from '@/services/process'

export default {
  namespace: 'repairCompany',
  state: {
    repairCompanyList:{
      list:[],
      pagination: {
      },
    },
    sendRepairCodeList: {
      list: [],
      pagination: [],
    },
    autoSearchCompanyList: [],
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
    *fetchSendRepairCode({ payload }, { call, put }) {
      const response = yield call(querySendRepairCode, payload);
      yield put({
        type: 'saveSendRepairCode',
        payload: response,
      });
    },
    *searchRepairCompany({ payload }, { call, put }) {
      const response = yield call(searchRepairCompany, payload);
      yield put({
        type: 'saveAutoSearch',
        payload: response,
      });
    },
  },
  reducers: {
    saveRepairCompany(state, action) {
      return {
        ...state,
        repairCompanyList: action.payload,
      };
    },
    saveSendRepairCode(state, action){
      return {
        ...state,
        sendRepairCodeList: action.payload,
      }
    },
    saveAutoSearch(state, action){
      return {
        ...state,
        autoSearchCompanyList: action.payload
      }
    }
  },

}
