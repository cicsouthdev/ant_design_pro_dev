import request from '@/utils/request';

export async function queryReport() {
  return request('/demo/report');
}

