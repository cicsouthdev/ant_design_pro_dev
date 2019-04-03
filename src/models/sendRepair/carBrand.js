import {
} from '@/services/process';

export default {
  namespace: 'carBrand',
  state: {
    carBrandList: {
      list:[],
      pagination: {},
    }
  },
  effects: {
    *fetch({payload}, {call, put}){
      const response = yield call('',payload);
      yield put({
        type: 'saveCarBrand',
        payload: response,
      })
    },
  },
  reducers: {
    saveCarBrand(state, action){
      return {
        ...state,
        carBrandList: action.payload,
      }
    },
  },
}
