import {queryProcessEngineData} from '@/services/process'

export default {
  namespace: 'processEngine',
  state: {
    systemEvent:{
      list:[],
      pagination: {},
    },
    msgSend: {
      list:[],
      pagination: {},
    },
    msgReceive: {
      list:[],
      pagination: {},
    },
    taskSendDistribution: {
      list:[],
      pagination: {},
    },
    msgQueue: {
      list: [],
      pagination: {},
    }
  },
  effects: {
    *fetchSystemEvent({payload={}}, { call, put }){
      payload.type= 'systemEvent';
      const response = yield call(queryProcessEngineData, payload);
      yield put({
        type: 'saveSystemEvent',
        payload: response,
      });
    },
    *fetchMsgSend({payload={}}, { call, put }){
      payload.type= 'msgSend';
      const response = yield call(queryProcessEngineData, payload);
      yield put({
        type: 'saveMsgSend',
        payload: response,
      });
    },
    *fetchMsgReceive({payload={}}, { call, put }){
      payload.type= 'msgReceive';
      const response = yield call(queryProcessEngineData, payload);
      yield put({
        type: 'saveMsgReceive',
        payload: response,
      });
    },
    *fetchTaskSendDistribution({payload={}}, { call, put }){
      payload.type= 'taskSendDistribution';
      const response = yield call(queryProcessEngineData, payload);
      yield put({
        type: 'saveTaskSendDistribution',
        payload: response,
      });
    },
    *fetchMsgQueue({payload={}}, { call, put }){
      payload.type= 'msgQueue';
      const response = yield call(queryProcessEngineData, payload);
      yield put({
        type: 'saveMsgQueue',
        payload: response,
      });
    },

  },
  reducers: {
    saveSystemEvent(state, action){
      return {
        ...state,
        systemEvent: action.payload,
      };
    },
    saveMsgSend(state, action){
      return {
        ...state,
        msgSend: action.payload,
      };
    },
    saveMsgReceive(state, action){
      return {
        ...state,
        msgReceive: action.payload,
      };
    },
    saveTaskSendDistribution(state, action){
      return {
        ...state,
        taskSendDistribution: action.payload,
      };
    },
    saveMsgQueue(state, action){
      return {
        ...state,
        msgQueue: action.payload,
      };
    },
  },
}
