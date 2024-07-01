export function getRightIMGurl(url) {
  return url == null
    ? '#'
    : url.indexOf('blob') != -1
    ? url
    : process.env.dev_mode == true
    ? `${process.env.SERVER_URL.replace('api', '')}${url
        .substr(7)
        .replaceAll('\\', '/')}`
    : `${process.env.SERVER_URL.replace('api', '')}${url.replaceAll('\\', '/')}`
}
