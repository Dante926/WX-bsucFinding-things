// 请求封装
export const ajax = (url,method,data)=>{
  const base_url = 'http://127.0.0.1:8082',
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${base_url}${url}`,
      method:method?method:'GET',
      data,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}