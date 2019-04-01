import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryReport(params) {
  return request(`/demo/report?${stringify(params)}`);
}

export async function queryReprotInit(){
  return request('/demo/reportInit');
}

export async function searchBrand(params){
  return request(`/demo/brand?${stringify(params)}`);
}

