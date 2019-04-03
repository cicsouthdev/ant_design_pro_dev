import {
  queryRepairCompany,
  queryBelongCompany,
  querySendRepairCode,
  searchRepairCompany,
  searchBrand,
} from '@/services/process';

export default {
  namespace: 'repairCompany',
  state: {
    repairCompanyList: {
      list: [],
      pagination: {},
    },
    belongCompanyList: [],
    sendRepairCodeList: {
      list: [],
      pagination: [],
    },
    autoSearchCompanyList: [],
    autoBrandList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRepairCompany, payload);
      yield put({
        type: 'saveRepairCompany',
        payload: response,
      });
    },
    *add() {},
    *update() {},
    *delete() {},
    *getBelongCompanyList({ payload }, { call, put }) {
      const response = yield call(queryBelongCompany, payload);
      yield put({
        type: 'saveBelongCompanyList',
        payload: response,
      });
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
    *searchAutoBrand({ payload }, { call, put }){
      const response = yield call(searchBrand, payload);
      yield put({
        type: 'saveAutoBrand',
        payload: response,
      });
    }
  },
  reducers: {
    saveRepairCompany(state, action) {
      return {
        ...state,
        repairCompanyList: action.payload,
      };
    },
    saveBelongCompanyList(state, action) {
      return {
        ...state,
        belongCompanyList: action.payload,
      };
    },
    saveSendRepairCode(state, action) {
      return {
        ...state,
        sendRepairCodeList: action.payload,
      };
    },
    saveAutoSearch(state, action) {
      return {
        ...state,
        autoSearchCompanyList: action.payload,
      };
    },
    saveAutoBrand(state, action) {
      return {
        ...state,
        autoBrandList: action.payload,
      }
    }
  },
};
