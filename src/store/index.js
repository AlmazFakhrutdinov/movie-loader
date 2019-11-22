import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allCategories: [],
    movieByCategories: [],
    loading: true,
  },
  getters: {

  },
  actions: {
    async GET_MOVIE(context, [pageNumber, checkboxGroup]) {
      context.state.loading = true
      if (context[pageNumber]) {
        return
      } else {
        try {

          const categories = await Promise.all([
            api.getNowPlaying(pageNumber),
            api.getPopular(pageNumber), 
            api.getTopRated(pageNumber), 
            api.getUpcoming(pageNumber)
          ])

          context.commit('SET_ALL_CATEGORIES', [categories, pageNumber, checkboxGroup])
        } catch (error) {
          window.console.log(error)
        }
      }

    }
  },
  mutations: {
    SET_ALL_CATEGORIES(state, [categories, pageNumber, checkboxGroup]) {
      for(let j = 0; j <= categories.length - 1; j++) {
        categories[j].data.results.forEach(element => {
          element.poster_path = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${ element.poster_path }`
        })
      }

      state.allCategories[pageNumber] = {
        nowPlaying: categories[0].data.results,
        popular: categories[1].data.results,
        topRated: categories[2].data.results,
        upcoming: categories[3].data.results
      } 
      
      const movie = []
      const categoriesItem = state.allCategories[pageNumber]

      // отбрасываем повторяющиеся фильмы по id и запоняем массив для показа на главное странице
      for (let i = 0; i <= checkboxGroup.length - 1; i++) {
        categoriesItem[checkboxGroup[i]].forEach(element => {
          if(!movie.includes(movie.find(elem => elem.id == element.id))) {
            movie.push(element)
          } 
        });
      }

      state.movieByCategories = movie
      state.loading = false
    },
    SET_MOVIE(state, [pageNumber, checkboxGroup]) {
      const movie = []
      const categoriesItem = state.allCategories[pageNumber]

      for (let i = 0; i <= checkboxGroup.length - 1; i++) {
        categoriesItem[checkboxGroup[i]].forEach(element => {
          movie.push(element)
        });
      }

      state.movieByCategories = movie
    }
  }
})

export default store