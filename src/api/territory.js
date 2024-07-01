import request from './config.js'

export function create(data) {
  return request({
    url: `territory/create`,
    method: 'post',
    data,
  })
}

export function update(data) {
  return request({
    url: `territory/update`,
    method: 'post',
    data,
  })
}

export function getByID(id) {
  return request({
    url: `territory/${id}`,
    method: 'get',
  })
}

export function getAll() {
  return request({
    url: `territory/`,
    method: 'get',
  })
}

export function getAllExistedCities() {
  return request({
    url: `territory/get/cities`,
    method: 'get',
  })
}

export function addComfort(ter_id, comf_id) {
  return request({
    url: `territory/${ter_id}/add-comfort/${comf_id}`,
    method: 'post',
  })
}
export function removeComfort(ter_id, comf_id) {
  return request({
    url: `territory/${ter_id}/remove/comfort/${comf_id}`,
    method: 'post',
  })
}

export function getAllFilters() {
  return request({
    url: `territory/filters/get-all`,
    method: 'get',
  })
}

export function AddFilter(ter_id, filter_id) {
  return request({
    url: `territory/${ter_id}/add-filter/${filter_id}`,
    method: 'post',
  })
}

export function RemoveFilter(ter_id, filter_id) {
  return request({
    url: `territory/${ter_id}/remove/filter/${filter_id}`,
    method: 'post',
  })
}

export function getLandingTerritorriesOptimized() {
  return request({
    url: `territory/get/landing-territories`,
    method: 'get',
  })
}


export function getTerritoryMainInfo(id) {
  return request({
    url: `territory/get/territory-head/${id}`,
    method: 'get',
  })
}
