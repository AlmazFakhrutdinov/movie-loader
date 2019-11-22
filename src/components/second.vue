<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title is-2 has-text-centered">Second option</h2>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="is-flex select-group">
          <section>
            <b-dropdown v-model="sortBy" multiple aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>Sort By ({{ sortBy.length }})</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item value="popularity.asc" aria-role="listitem">
                <span>Popularity asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="popularity.desc" aria-role="listitem">
                <span>Popularity desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="release_date.asc" aria-role="listitem">
                <span>Release date asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="release_date.desc" aria-role="listitem">
                <span>Release date desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="revenue.asc" aria-role="listitem">
                <span>Revenue asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="revenue.desc" aria-role="listitem">
                <span>Revenue desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="primary_release_date.asc" aria-role="listitem">
                <span>Primary release asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="primary_release_date.desc" aria-role="listitem">
                <span>Primary release desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="original_title.asc" aria-role="listitem">
                <span>Original title asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="original_title.desc" aria-role="listitem">
                <span>Original title desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="vote_average.asc" aria-role="listitem">
                <span>Vote average asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="vote_average.desc" aria-role="listitem">
                <span>Vote average desc</span>
              </b-dropdown-item>

              <b-dropdown-item value="vote_count.asc" aria-role="listitem">
                <span>Vote count asc</span>
              </b-dropdown-item>

              <b-dropdown-item value="vote_count.desc" aria-role="listitem">
                <span>Vote count desc</span>
              </b-dropdown-item>
            </b-dropdown>
          </section>
          <section>
            <b-dropdown v-model="genres" multiple aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>Genres ({{ genres.length }})</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item value="28" aria-role="listitem">
                <span>Action</span>
              </b-dropdown-item>

              <b-dropdown-item value="12" aria-role="listitem">
                <span>Adventure</span>
              </b-dropdown-item>

              <b-dropdown-item value="16" aria-role="listitem">
                <span>Animation</span>
              </b-dropdown-item>

              <b-dropdown-item value="35" aria-role="listitem">
                <span>Comedy</span>
              </b-dropdown-item>

              <b-dropdown-item value="80" aria-role="listitem">
                <span>Crime</span>
              </b-dropdown-item>

              <b-dropdown-item value="99" aria-role="listitem">
                <span>Documentary</span>
              </b-dropdown-item>

              <b-dropdown-item value="18" aria-role="listitem">
                <span>Drama</span>
              </b-dropdown-item>

              <b-dropdown-item value="10751" aria-role="listitem">
                <span>Family</span>
              </b-dropdown-item>

              <b-dropdown-item value="14" aria-role="listitem">
                <span>Fantasy</span>
              </b-dropdown-item>

              <b-dropdown-item value="36" aria-role="listitem">
                <span>History</span>
              </b-dropdown-item>

              <b-dropdown-item value="27" aria-role="listitem">
                <span>Horror</span>
              </b-dropdown-item>

              <b-dropdown-item value="10402" aria-role="listitem">
                <span>Music</span>
              </b-dropdown-item>

              <b-dropdown-item value="9648" aria-role="listitem">
                <span>Mystery</span>
              </b-dropdown-item>

              <b-dropdown-item value="10749" aria-role="listitem">
                <span>Romance</span>
              </b-dropdown-item>

              <b-dropdown-item value="878" aria-role="listitem">
                <span>Science Fiction</span>
              </b-dropdown-item>

              <b-dropdown-item value="10770" aria-role="listitem">
                <span>TV Movie</span>
              </b-dropdown-item>

              <b-dropdown-item value="53" aria-role="listitem">
                <span>Thriller</span>
              </b-dropdown-item>

              <b-dropdown-item value="10752" aria-role="listitem">
                <span>War</span>
              </b-dropdown-item>

              <b-dropdown-item value="37" aria-role="listitem">
                <span>Western</span>
              </b-dropdown-item>
            </b-dropdown>
          </section>
        </div>
      </div>
      <div class="column">
        <pagination class="pagi" :pageNumber="pageNumber" @changePageNumber="changePageNumber" />
      </div>
    </div>

    <div class="movie-container">
      <MovieList
        class="movie box is-paddingless is-radiusless"
        v-for="(movie, index) in movieListData"
        :key="index"
        :movie="movie"
        @movieInfo="movieInfo"
      />
    </div>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
import api from "../api";
import MovieList from "./movie-list";
import Pagination from "./pagination";


export default {
  components: { MovieList, Pagination },
  data() {
    return {
      sortBy: [],
      genres: [],
      pageNumber: 1,
      movieListData: [],
      isLoading: false,
      isFullPage: true
    };
  },
  mounted() {
    this.checkAndUpdate();
  },
  methods: {
    changePageNumber(id) {
      this.pageNumber = id
      this.checkAndUpdate()
    },
    movieInfo(id) {
      const route = this.$router.resolve({ path: `movieInfo/${id}` });
      window.open(route.href, "_blank");
    },
    checkAndUpdate() {
      this.isLoading = true;
      function turnToString(item, str) {
        return item.map(element => (element += str)).join();
      }

      const sortString = turnToString(this.sortBy, "&");
      let intermidietGenresString = turnToString(this.genres, "%2c");
      let genresString = intermidietGenresString.slice(
        0,
        intermidietGenresString.length - 3
      );

      api
        .getMovieList(sortString, genresString, this.pageNumber)
        .then(response => {
          response.data.results.forEach(element => {
            element.poster_path = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${element.poster_path}`;
          });

          this.movieListData = response.data.results;
        });
    }
  },
  watch: {
    movieListData() {
      this.isLoading = false;
    },
    sortBy() {
      this.checkAndUpdate();
    },
    genres() {
      this.checkAndUpdate();
    }
  }
};
</script>

<style scoped>
.movie-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.select-group section{
  margin-left: 13px;
}
.pagi {
  width: 98%;
}
</style>