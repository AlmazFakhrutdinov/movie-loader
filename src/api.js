import axios from 'axios';

const apiUrl = {
  nowPlaying(pageNumber) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&page=${ pageNumber }`
  },
  popular(pageNumber) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&page=${ pageNumber }`
  },
  topRated(pageNumber) {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&page=${ pageNumber }`
  },
  upcoming(pageNumber) {
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&page=${ pageNumber }`
  },
  movieList(sortString, genresString, pageNumber) {
    if(sortString && genresString) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&sort_by=${ sortString }&include_adult=false&include_video=false&page=${ pageNumber }&with_genres=${ genresString }`
    } else if (sortString && !genresString) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&sort_by=${ sortString }&include_adult=false&include_video=false&page=${ pageNumber }`
    } else if (!sortString && genresString) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&include_adult=false&include_video=false&page=${ pageNumber }&with_genres=${ genresString }`         
    } else {
      return `https://api.themoviedb.org/3/discover/movie?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US&include_adult=false&include_video=false&page=${ pageNumber }`         
    }
  }
}

const api = {
  getNowPlaying(pageNumber) {
    return axios.get(apiUrl.nowPlaying(pageNumber))
  },
  getPopular(pageNumber) {
    return axios.get(apiUrl.popular(pageNumber))
  },
  getTopRated(pageNumber) {
    return axios.get(apiUrl.topRated(pageNumber))
  },
  getUpcoming(pageNumber) {
    return axios.get(apiUrl.upcoming(pageNumber))
  },
  getMovieList(sortString, genresString, pageNumber) {
    return axios.get(apiUrl.movieList(sortString, genresString, pageNumber))
  }
}

export default api;