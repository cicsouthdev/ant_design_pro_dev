import {queryCarBrandRel, searchBrand} from '@/services/process'

export default {
  namespace: 'process',
  state: {
    carBrandRelList:{
      list:[],
      pagination: {
      },
    },
    brandAutoCompleteData: [],
  },
  effects: {
    *carBrandRel({ payload }, { call, put }) {
      const response = yield call(queryCarBrandRel, payload);
      yield put({
        type: 'saveCarBrandRel',
        payload: response,
      });
    },
    // *addCarBrandRel
    *searchBrand({payload}, {call, put}){
      const response = yield call(searchBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
    }

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
