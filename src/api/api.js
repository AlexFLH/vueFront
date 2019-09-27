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

export const getUser1 = params => { return axios.get(`/user`, { params: params }); };
export const editUserSelf = params => { return axios.post(`/user/edit_self`, params).then(res => res.data); };
export const editPwd = params => { return axios.post(`/user/editPwd`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`/user/list`, { params: params }); };
export const deleteUser = params => { return axios.get(`/user/remove`, { params: params }); };
export const batchDeleteUser = params => { return axios.get(`/user/batchremove`, { params: params }); };
export const addUser = params => { return axios.get(`/user/add`, { params: params }); };
export const editUser = params => { return axios.get(`/user/edit`, { params: params }); };

