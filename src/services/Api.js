import axios from 'axios'
const accessToken = 'd7c890db525354469bee737ab06bbf4c6bedf6c8'

export default () => {
  return axios.create({
    baseURL: `https://api.github.com`,
    headers: {
      'Authorization' : `token ${accessToken}`
    }
  })
}
