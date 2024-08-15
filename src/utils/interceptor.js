export const interceptors = (instance) => {
  instance.interceptors.response.use(
    (config) => {
      const token = localStorage.setItem('accessToken');

      config.headers = {
        authorization: token ? `bearer ${token}` : null,
      }
      return config
    },
    (error) => Promise.reject(error.response)
  )
  return instance
}