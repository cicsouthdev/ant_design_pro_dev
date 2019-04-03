import {
  queryBrandSSSSRel,
  saveBrandSSSSRel,
  updateBrandSSSSRel,
  queryBelongCompany,
} from '@/services/process';

export default {
  namespace: 'brandSSSSRel',
  state: {
    brandSSSSRelList: [],
    belongCompanyList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBrandSSSSRel, payload);
      yield put({
        type: 'saveBrandSSSSRelList',
        payload: response,
      });
    },
    *add({ payload }, { call }) {
      yield call(saveBrandSSSSRel, payload);
    },
    *update({ payload }, { call }) {
      yield call(updateBrandSSSSRel, payload);
    },
    *getBelongCompanyList({ payload }, { call, put }) {
      const response = yield call(queryBelongCompany, payload);
      yield put({
        type: 'saveBelongCompanyList',
        payload: response,
      });
    },
  },
  reducers: {
    saveBrandSSSSRelList(state, action) {
      return {
        ...state,
        brandSSSSRelList: action.payload,
      };
    },
    saveBelongCompanyList(state, action) {
      return {
        ...state,
        belongCompanyList: action.payload,
      };
    },
  },
};
