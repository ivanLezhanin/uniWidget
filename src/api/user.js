import request from './config.js'

export function getOrganizationsList(userid, type) {
  return request({
    url: `user/${userid}/orgs/${type}`,
    method: 'get',
  })
}

export function getUserInfo(userid) {
  return request({
    url: `user/${userid}`,
    method: 'get',
  })
}

export function updateUserInfo(userid, data) {
  return request({
    url: `user/update/${userid}/`,
    method: 'put',
    data,
  })
}

export function getMyRights(userid) {
  return request({
    url: `right/by-user/${userid}/`,
    method: 'get',
  })
}
