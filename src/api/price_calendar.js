import request from './config.js'

export function findPricesByObjectID(object_id) {
  return request({
    url: `price-calendar/find/object/${object_id}`,
    method: 'get',
  })
}

export function pricesBulkCreate(data) {
  return request({
    url: `price-calendar/create/bulk`,
    method: 'post',
    data,
  })
}

export function pricesfindOrCreate(id, data) {
  return request({
    url: `price-calendar/create/find-or-create/${id}`,
    method: 'post',
    data,
  })
}
