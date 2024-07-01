import request from './config.js'

export function create(data) {
  return request({
    url: `territory-card/create`,
    method: 'post',
    data,
  })
}

export function findById(id) {
  return request({
    url: `territory-card/${id}`,
    method: 'get',
  })
}


export function findTerritoryCards(id) {
  return request({
    url: `territory-card/get/by-territory/${id}`,
    method: 'get',
  })
}
