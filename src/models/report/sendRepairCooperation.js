import {
  searchPremium, initPremium,
  searchPayoutRate, initPayoutRate,
  searchRepairAmount, initRepairAmount,
  searchProfit, initProfit,
  searchResourceScore, initResourceScore,
} from '@/services/report'

export default {
  namespace: 'sendRepairCooperation',
  state: {
    premiumList: [],
    premiumInitData: {
    },

    payoutRateList: [],
    payoutRateInitData: {

    },

    repairAmountList: [],
    repairAmountInitData: {

    },

    profitList: [],
    profitInitData: {

    },

    resourceScoreList: [],
    resourceScoreInitData: {

    },


  },
  effects: {
    *fetchPremium({ payload }, { call, put }) {
      const response = yield call(searchPremium, payload);
      yield put({
        type: 'savePremium',
        payload: response,
      });
    },
    *initPremium({},{call, put}){
      const response = yield call(initPremium);
      yield put({
        type: 'savePremiumInitData',
        payload: response,
      });
    },

    *fetchPayoutRate({ payload }, { call, put }) {
      const response = yield call(searchPayoutRate, payload);
      yield put({
        type: 'savePayoutRate',
        payload: response,
      });
    },
    *initPayoutRate({},{call, put}){
      const response = yield call(initPayoutRate);
      yield put({
        type: 'savePayoutRateInitData',
        payload: response,
      });
    },

    *fetchRepairAmount({ payload }, { call, put }) {
      const response = yield call(searchRepairAmount, payload);
      yield put({
        type: 'saveRepairAmount',
        payload: response,
      });
    },
    *initRepairAmount({},{call, put}){
      const response = yield call(initRepairAmount);
      yield put({
        type: 'saveRepairAmountInitData',
        payload: response,
      });
    },

    *fetchProfit({ payload }, { call, put }) {
      const response = yield call(searchProfit, payload);
      yield put({
        type: 'saveProfit',
        payload: response,
      });
    },
    *initProfit({},{call, put}){
      const response = yield call(initProfit);
      yield put({
        type: 'saveProfitInitData',
        payload: response,
      });
    },

    *fetchResourceScore({ payload }, { call, put }) {
      const response = yield call(searchResourceScore, payload);
      yield put({
        type: 'saveResourceScore',
        payload: response,
      });
    },
    *initResourceScore({},{call, put}){
      const response = yield call(initResourceScore);
      yield put({
        type: 'saveResourceScoreInitData',
        payload: response,
      });
    },

  },
  reducers: {
    savePremium(state, action){
      return {
        ...state,
        premiumList: action.payload,
      }
    },
    savePremiumInitData(state, action){
      return {
        ...state,
        premiumInitData: action.payload || {},
      }
    },

    savePayoutRate(state, action){
      return {
        ...state,
        payoutRateList: action.payload,
      }
    },
    savePayoutRateInitData(state, action){
      return {
        ...state,
        payoutRateInitData: action.payload || {},
      }
    },

    saveRepairAmount(state, action){
      return {
        ...state,
        repairAmountList: action.payload,
      }
    },
    saveRepairAmountInitData(state, action){
      return {
        ...state,
        repairAmountInitData: action.payload || {},
      }
    },

    saveProfit(state, action){
      return {
        ...state,
        profitList: action.payload,
      }
    },
    saveProfitInitData(state, action){
      return {
        ...state,
        profitInitData: action.payload || {},
      }
    },

    saveResourceScore(state, action){
      return {
        ...state,
        resourceScoreList: action.payload,
      }
    },
    saveResourceScoreInitData(state, action){
      return {
        ...state,
        resourceScoreInitData: action.payload || {},
      }
    },

  },

}
