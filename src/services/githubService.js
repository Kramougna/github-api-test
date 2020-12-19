import Api from '@/services/Api'

const accessToken = 'd7c890db525354469bee737ab06bbf4c6bedf6c8'
const gitHubUrl = 'https://api.github.com'

const githubService = {
  getUser: (userName) => Api().get(`${gitHubUrl}/users/${userName}`),
  getUserRepos: (userName) => Api().get(`/users/${userName}/repos`, { params: { type: 'public' } }),
  getRepoLanguages: (userName, repoName) => Api().get(`/repos/${userName}/${repoName}/languages`)
}

export default githubService
