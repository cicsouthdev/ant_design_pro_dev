import request from '@/utils/request';
import { stringify } from 'qs';

export async function searchSendRepairNum(params) {
  return request(`/report/sendRepairNum?${stringify(params)}`);
}

export async function searchSendRepairSuccess(params) {
  return request(`/report/sendRepairSuccess?${stringify(params)}`);
}

export async function initSendRepairNum() {
  return request('/report/sendRepairNumInit');
}

export async function initSendRepairSuc(){
  return request('/report/sendRepairSuccessInit');
}

export async function searchMonitorRemedy(){
  return request('/report/monitorRemedy');
}

export async function initMonitorRemedy(){
  return request('/report/monitorRemedyInit');
}
