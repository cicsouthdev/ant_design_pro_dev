import {queryBrandSSSSRel, saveBrandSSSSRel, updateBrandSSSSRel} from '@/services/process'

export default {
  namespace: 'brandSSSSRel',
  state: {
    brandSSSSRelList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBrandSSSSRel, payload);
      yield put({
        type: 'saveBrandSSSSRelList',
        payload: response,
      });
    },
    *add({ payload }, {call}){
      yield call(saveBrandSSSSRel, payload);
    },
    *update({ payload }, {call}){
      yield call(updateBrandSSSSRel, payload);
    },
  },
  reducers: {
    saveBrandSSSSRelList(state, action) {
      return {
        ...state,
        brandSSSSRelList: action.payload,
      };
    },
  }
}
