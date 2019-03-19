import request from '@/utils/request';

export async function query() {
  return request('/api/testQuery');
}

export async function queryCurrent() {
  return request('/api/testQueryCurrent');
}
