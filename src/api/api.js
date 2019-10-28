import axios from 'axios';

export const Login = params => axios.get(`/api/login`,
  {
    params:{
      passport: params.passport,
      password: params.password
    }
  });

export const getUser = params => axios.get('/api/getUserInfo',
  {
    params:{
      passport: params.passport
    }
  })

export const getContentTrace = params => axios.get('/api/getContentTrace', {
  params: {
    contentId: params.contentId
  }
})

//根据traceId获取请求信息
export const parseTraceId = params => axios.get('/api/parseTraceId', {
  params: {
    traceId: params.traceId
  }
})

//根据traceId获取内容信息
export const getTraceContent = params => axios.get('/api/getSecurityStatusFromTraceId', {
  params: {
    traceId: params.traceId
  }
})


