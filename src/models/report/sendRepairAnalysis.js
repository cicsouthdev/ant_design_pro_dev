import {
  searchClientFeedback, initClientFeedback,
  searchSendRepairProcess, initSendRepairProcess,
  searchSendRepairStrategy, initSendRepairStrategy,
  searchOrganizationCover, initOrganizationCover,
  searchRepairCompanyCover, initRepairCompanyCover,
} from '@/services/report'

export default {
  namespace: 'sendRepairAnalysis',
  state: {
    clientFeedbackList: [],
    clientFeedbackInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
      repairCompanyGroupList: [],
    },

    sendRepairProcessList:[],
    sendRepairProcessInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
      repairCompanyGroupList: [],
    },

    sendRepairStrategyList: [],
    sendRepairStrategyInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
    },

    organizationCoverList: [],
    organizationCoverInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
      repairCompanyGroupList: [],
      repairBrandList: [],
    },

    repairCompanyCoverList: [],
    repairCompanyCoverInitData: {
      belongCompanyList: [],
      authorizeCompanyList: [],
      repairCompanyList: [],
      repairCompanyGroupList: [],
      repairBrandList: [],
    },


  },
  effects: {
    *fetchClientFeedback({ payload }, { call, put }) {
      const response = yield call(searchClientFeedback, payload);
      yield put({
        type: 'saveClientFeedback',
        payload: response,
      });
    },
    *initClientFeedback({},{call, put}){
      const response = yield call(initClientFeedback);
      yield put({
        type: 'saveClientFeedbackInitData',
        payload: response,
      });
    },

    *fetchSendRepairProcess({ payload }, { call, put }) {
      const response = yield call(searchSendRepairProcess, payload);
      yield put({
        type: 'saveSendRepairProcess',
        payload: response,
      });
    },
    *initSendRepairProcess({},{call, put}){
      const response = yield call(initSendRepairProcess);
      yield put({
        type: 'saveSendRepairProcessInitData',
        payload: response,
      });
    },

    *fetchSendRepairStrategy({ payload }, { call, put }) {
      const response = yield call(searchSendRepairStrategy, payload);
      yield put({
        type: 'saveSendRepairStrategy',
        payload: response,
      });
    },
    *initSendRepairStrategy({},{call, put}){
      const response = yield call(initSendRepairStrategy);
      yield put({
        type: 'saveSendRepairStrategyInitData',
        payload: response,
      });
    },

    *fetchOrganizationCover({ payload }, { call, put }) {
      const response = yield call(searchOrganizationCover, payload);
      yield put({
        type: 'saveOrganizationCover',
        payload: response,
      });
    },
    *initOrganizationCover({},{call, put}){
      const response = yield call(initOrganizationCover);
      yield put({
        type: 'saveOrganizationCoverInitData',
        payload: response,
      });
    },

    *fetchRepairCompanyCover({ payload }, { call, put }) {
      const response = yield call(searchRepairCompanyCover, payload);
      yield put({
        type: 'saveRepairCompanyCover',
        payload: response,
      });
    },
    *initRepairCompanyCover({},{call, put}){
      const response = yield call(initRepairCompanyCover);
      yield put({
        type: 'saveRepairCompanyCoverInitData',
        payload: response,
      });
    },

  },
  reducers: {
    saveClientFeedback(state, action){
      return {
        ...state,
        clientFeedbackList: action.payload,
      }
    },
    saveClientFeedbackInitData(state, action){
      return {
        ...state,
        clientFeedbackInitData: action.payload || {},
      }
    },

    saveSendRepairProcess(state, action){
      return {
        ...state,
        sendRepairProcessList: action.payload,
      }
    },
    saveSendRepairProcessInitData(state, action){
      return {
        ...state,
        sendRepairProcessInitData: action.payload || {},
      }
    },

    saveSendRepairStrategy(state, action){
      return {
        ...state,
        sendRepairStrategyList: action.payload,
      }
    },
    saveSendRepairStrategyInitData(state, action){
      return {
        ...state,
        sendRepairStrategyInitData: action.payload || {},
      }
    },

    saveOrganizationCover(state, action){
      return {
        ...state,
        organizationCoverList: action.payload,
      }
    },
    saveOrganizationCoverInitData(state, action){
      return {
        ...state,
        organizationCoverInitData: action.payload || {},
      }
    },

    saveRepairCompanyCover(state, action){
      return {
        ...state,
        repairCompanyCoverList: action.payload,
      }
    },
    saveRepairCompanyCoverInitData(state, action){
      return {
        ...state,
        repairCompanyCoverInitData: action.payload || {},
      }
    },

  },

}
