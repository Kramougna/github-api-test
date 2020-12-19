<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-text-field
        v-model="userNameIput"
        @input="updateSearch">
      </v-text-field>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="4">

          <b v-if="repos.length > 0">"{{userNameIput}}" --> {{ repos.length }} public repos found</b>
          <b v-else>No public repos found, please search another user</b>
          <v-list v-for="(language, index) in Object.keys(languages)" :key="index">
            <v-list-item>
              <v-list-item-content>
                {{ language }}
              </v-list-item-content>
              <v-list-item-action>
                {{ languages[language] }}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="8">
          <chart v-if="repos.length > 0" ref="chart"></chart>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import githubService from '@/services/githubService'
import Chart from '@/components/Chart'

export default {
  props: {
  },
  components: {
    Chart
  },
  data () {
    return {
      repos: [],
      languages: {},
      userNameIput: 'kramougna'
    }
  },
  methods: {
    async search (userName) {
      try {
        this.repos = await githubService.getUserRepos(userName)
          .then(response => response.data)
          
        const repoLanguages = await Promise.all(this.repos.map(
          repo =>  {
            return githubService.getRepoLanguages(userName, repo.name)
              .then(response => response.data)
          }))

        this.languages = this.sortable(repoLanguages.reduce((languagesList, languages) => {
          Object.keys(languages).forEach(language => {
            languagesList[language] = (languagesList[language] || 0) + languages[language]
          })
          return languagesList
        }, {}))

        this.$refs.chart.init(this.languages)
      } catch (e) {
        console.error(e)
        this.repos = []
        this.languages = {}
      }
    },
    sortable (obj) {
      return Object.entries(obj)
        .sort(([,a],[,b]) => b-a)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
    },
    updateSearch: debounce(function (userName) {
        this.search(userName)
        this.userNameIput = userName
      }
    , 500)
  },
  mounted () {
    this.search('kramougna')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
