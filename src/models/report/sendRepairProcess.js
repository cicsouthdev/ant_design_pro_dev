import {
  searchSendRepairNum,
  initSendRepairNum,
  searchSendRepairSuccess,
  initSendRepairSuc,
  searchMonitorRemedy,
  initMonitorRemedy,
} from '@/services/report'

export default {
  namespace: 'sendRepairProcess',
  state: {
    sendRepairNumList: [],
    sendRepairNumInitData: {
      belongCompanyList: [],
      surveyPossessionList: [],
      repairCompanyList: [],
      policyBelongList: [],
      sendRepairBrand: [],
    },
    sendRepairSuccessList: [],
    sendRepairSuccessInitData: {
      belongCompanyList: [],
      surveyPossessionList: [],
      repairCompanyList: [],
      policyBelongList: [],
      sendRepairBrand: [],
    },
    monitorRemedyList: [],
    monitorRemedyInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
      repairCompanyGroupList: [],
    },
  },
  effects: {
    *fetchSendRepairNum({ payload }, { call, put }) {
      const response = yield call(searchSendRepairNum, payload);
      yield put({
        type: 'saveSendRepairNum',
        payload: response,
      });
    },
    *initSendRepairNum({},{call, put}){
      const response = yield call(initSendRepairNum);
      yield put({
        type: 'saveSendRepairNumInitData',
        payload: response,
      });
    },
    *fetchSendRepairSuccess({payload}, {call, put}){
      const response = yield call(searchSendRepairSuccess, payload);
      yield put({
        type: 'saveSendRepairSuccess',
        payload: response,
      });
    },
    *initSendRepairSuccess({}, {call, put}){
      const response = yield call(initSendRepairSuc);
      yield put({
        type: 'saveSendRepairSuccessInitData',
        payload: response,
      });
    },
    *fetchMonitorRemedy({ payload }, { call, put }){
      const response = yield call(searchMonitorRemedy);
      yield put({
        type: 'saveMonitorRemedy',
        payload: response,
      });
    },
    *initMonitorRemedy({}, {call, put}){
      const response = yield call(initMonitorRemedy);
      yield put({
        type: 'saveMonitorRemedyInitData',
        payload: response,
      });
    },
  },
  reducers: {
    saveSendRepairNum(state, action){
      return {
        ...state,
        sendRepairNumList: action.payload,
      }
    },
    saveSendRepairNumInitData(state, action){
      return {
        ...state,
        sendRepairNumInitData: action.payload || {},
      }
    },
    saveSendRepairSuccess(state, action){
      return {
        ...state,
        sendRepairSuccessList: action.payload,
      }
    },
    saveSendRepairSuccessInitData(state, action){
      return {
        ...state,
        sendRepairSuccessInitData: action.payload || {},
      }
    },
    saveMonitorRemedy(state, action){
      return {
        ...state,
        monitorRemedyList: action.payload,
      }
    },
    saveMonitorRemedyInitData(state, action){
      return {
        ...state,
        monitorRemedyInitData: action.payload || {},
      }
    },
  },
}
