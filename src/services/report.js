import request from '@/utils/request';
import { stringify } from 'qs';

export async function searchSendRepairNum(params){
  return request(`/report/sendRepairNum?${stringify(params)}`);
}

export async function searchSendRepairSuccess(params){
  return request(`/report/sendRepairSuccess?${stringify(params)}`);
}

export async function initSendRepairNum(){
  return request('/report/sendRepairNumInit');
}
