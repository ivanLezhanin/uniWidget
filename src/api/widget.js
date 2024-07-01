import request from './config.js'

export function getByAppKey(key) {
    return request({
        url: `widget/application/${key}`,
        method: 'get',
    })
}
