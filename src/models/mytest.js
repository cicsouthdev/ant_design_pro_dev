import {query, queryCurrent} from '@/services/mytest'

export default {
  namespace: 'mytest',
  state: {},
  effects: {
    *fetchQuery (_, {call, put}){
      const response = yield call(query);
      yield put({
        type: 'save',
        payload: Array.isArray(response)? response:[]
      })
    },
    *fetchCurrent (_, {call, put}){
      const response = yield call(queryCurrent);
      yield put({
        type: '',
        payload: response
      })
    }
  },
  reducers: {
    save(state, action){
      return {
        ...state,
        notice: action.payload
      }
    },
    update(state, action){
      return {
        ...state,
        ttt: action.payload
      }
    }
  }

}
