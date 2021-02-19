export default function ({ app: { $axios } }) {
  // 数据访问前缀
  $axios.defaults.baseURL = 'https://api-node.tony93.top/poem'

  $axios.interceptors.request.use(
    (config) => config,
    (error) => {
      Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    (response) => {
      if (response.data.code !== 0) {
        return Promise.reject(response.data)
      } else {
        return response.data
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
