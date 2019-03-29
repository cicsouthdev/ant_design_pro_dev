import {queryCarBrandRel, searchBrand, saveCarBrandRel, updateCarBrandRels} from '@/services/process'

export default {
  namespace: 'carBrandRel',
  state: {
    carBrandRelList:{
      list:[],
      pagination: {},
    },
    brandAutoCompleteData: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCarBrandRel, payload);
      yield put({
        type: 'saveCarBrandRel',
        payload: response,
      });
    },
    *searchBrand({payload}, {call, put}){
      const response = yield call(searchBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
    },
    *add({ payload }, {call, put}){
      yield call(saveCarBrandRel, payload);
    },
    *addAll({ payload }, {call, put}){
      yield call(updateCarBrandRels, payload);
    },

  },
  reducers: {
    saveCarBrandRel(state, action) {
      return {
        ...state,
        carBrandRelList: action.payload,
      };
    },
    saveBrand(state, action){
      return {
        ...state,
        brandAutoCompleteData: action.payload
      }
    }
  }

}
