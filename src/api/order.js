import request from './config.js'

export function createOrder(data) {
  return request({
    url: `order/create`,
    method: 'post',
    data,
  })
}

export function getAllOrders() {
  return request({
    url: `order/`,
    method: 'get',
  })
}

export function adminGetAllOrders() {
  return request({
    url: `order/get-all/brief`,
    method: 'get',
  })
}

export function setOrderStatus(order_id, status_id) {
  return request({
    url: `order/set-order-status/${order_id}/${status_id}`,
    method: 'post',
  })
}

export function getAllNewCounter(org_id) {
  return request({
    url: `order/get-all-new-counter/${org_id}`,
    method: 'get',
  })
}

export function getObjectOrdersOptimized(obj_id) {
  return request({
    url: `order/get-object-orders/${obj_id}`,
    method: 'get',
  })
}
