import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCarBrandRel(params) {
  return request(`/process/carBrandRel?${stringify(params)}`);
}

export async function searchBrand(params){
  return request(`/process/brand?${stringify(params)}`);
}
