const getBaseURL = () => {
  const dirURL = {
    "localhost:8000": "http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2",
    "staging.admin.newband.com": "http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2",
    "admin.newband.com": "http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2"
  }
  return dirURL[location.host]
}

export default  {
  name: 'NewBand App Administrator',
  prefix: '',//'NBAdmin',
  footerText: 'NewBand 版权所有 © 2016 由 felixpmg 提供支持',
  logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
  logoText: 'NewBand Admin',
  needLogin: true,
  baseURL: getBaseURL(),
  authApiToken: '65b6372750516f21e18d27037edad0e0'
}
