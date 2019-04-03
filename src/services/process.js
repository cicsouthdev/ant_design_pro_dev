import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCarBrandRel(params) {
  return request(`/process/carBrandRel?${stringify(params)}`);
}

export async function searchBrand(params) {
  return request(`/process/brand?${stringify(params)}`);
}

export async function saveCarBrandRel(params) {
  return request(`/process/carBrandRel`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateCarBrandRel(params) {
  return request(`/process/carBrandRel`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function updateCarBrandRels(params) {
  return request(`/process/carBrandRels`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryBrandSSSSRel(params) {
  return request(`/process/brandSSSSRel?${stringify(params)}`);
}

export async function saveBrandSSSSRel(params) {
  return request('/process/brandSSSSRel', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateBrandSSSSRel(params) {
  return request('/process/brandSSSSRel', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryRepairCompany(params) {
  return request(`/process/repairCompanies?${stringify(params)}`);
}

export async function queryRepairCompanyGroup(params) {
  return request(`/process/repairCompanyGroup?${stringify(params)}`);
}

export async function queryProcessEngineData(params) {
  return request(`/process/processEngine?${stringify(params)}`);
}

export async function queryUnSelectedCompany(params) {
  return request(`/process/unSelectedCompany`);
}

export async function queryBelongCompany() {
  return request(`/process/belongCompany`);
}

export async function querySendRepairCode(params) {
  return request('/process/sendRepairCode');
}

export async function searchRepairCompany(params) {
  return request(`/process/repairCompany?${stringify(params)}`);
}
