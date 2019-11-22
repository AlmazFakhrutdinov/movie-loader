<template>
  <div>
    <div class="is-flex">
      <div class="movie__img">
        <img :src="movie.poster_path" alt />
      </div>
      <div class="movie__content is-flex">
        <div>
          <div class>
            <h6 class="title is-6">{{ movie.original_title }}</h6>
          </div>

          <div>{{ getMonth(movie.release_date) }}</div>
        </div>
        <div class="movie-description">
          <p>{{ movie.overview.slice(0,213) }}</p>
        </div>
        <hr />
        <div>
          <p @click="$emit('movieInfo', movie.id)" class="info">More info</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["movie"],
  methods: {
    getMonth(item) {
      let date = new Date(item);
      let month = date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      return month;
    }
  }
};
</script>

<style scoped>
.movie {
  margin: 5px 13px 25px 13px;
  width: 48%;
}
.movie__img {
  width: 33%;
  height: 320px;
}
.movie__img img {
  width: 100%;
  width: 100%;
}
.movie__content {
  flex-direction: column;
  width: 67%;
  padding: 10px;
}
.movie-description {
  font-size: 14px;
  margin-top: 20px;
}
hr {
  margin-top: auto;
}
.info {
  margin-bottom: 10px;
  font-size: 14px;
}
.movie-container:last-child {
  height: 320px;
}
</style>