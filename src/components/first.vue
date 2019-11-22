<template>
  <div>
    <div>
      <h2 class="title is-2 has-text-centered">First option</h2>
    </div>
    <div class="columns nav">
      <div class="column">
        <b-field>
          <b-checkbox-button v-model="checkboxGroup" native-value="nowPlaying">Now Playing</b-checkbox-button>
          <b-checkbox-button v-model="checkboxGroup" native-value="popular">Popular</b-checkbox-button>
          <b-checkbox-button v-model="checkboxGroup" native-value="topRated">Top Rated</b-checkbox-button>
          <b-checkbox-button v-model="checkboxGroup" native-value="upcoming">Upcoming</b-checkbox-button>
        </b-field>
      </div>
      <div class="column">
        <pagination :pageNumber="pageNumber" @changePageNumber="changePageNumber" />
      </div>
    </div>
    <div class="movie-container">
      <MovieList
        class="movie box is-paddingless is-radiusless"
        v-for="(movie, index) in this.$store.state.movieByCategories"
        :key="index"
        :movie="movie"
        @movieInfo="movieInfo"
      />
    </div>
    <b-loading :is-full-page="true" :active.sync="this.$store.state.loading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import Pagination from "./pagination";
import MovieList from "./movie-list";

export default {
  components: { Pagination, MovieList },
  data() {
    return {
      checkboxGroup: ["nowPlaying", "popular", "topRated", "upcoming"],
      movies: null,
      pageNumber: 1
    };
  },
  mounted() {
    this.$store.dispatch("GET_MOVIE", [this.pageNumber, this.checkboxGroup]);
  },
  methods: {
    movieInfo(id) {
      const route = this.$router.resolve({ path: `movieInfo/${id}` });
      window.open(route.href, "_blank");
    },
    changePageNumber(id) {
      this.$store.dispatch("GET_MOVIE", [id, this.checkboxGroup]);
    }
  },
  watch: {
    checkboxGroup() {
      this.$store.commit("SET_MOVIE", [this.pageNumber, this.checkboxGroup]);
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
.nav {
  margin: 20px 0px;
}
</style>