<template>
  <div v-if="details" class="details">
    <Navbar />
    <div>
      <h2 class="title is-2 has-text-centered details-title">Movie details</h2>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <figure class="image is-2by3">
            <img :src="details.poster_path" alt />
          </figure>
        </div>
        <div class="column is-9">
          <div class="is-flex">
            <h3 class="title is-3">{{ details.original_title }}</h3>
            <p>({{ getYear(details.release_date) }})</p>
          </div>
          <div>
            <div>Average vote {{ details.vote_average }}</div>
          </div>
          <div>
            <h4 class="title is-4 overview">Overview</h4>
            <p>{{ details.overview }}</p>
          </div>
          <div>
            <section>
              <div class="content">
                <h4 class="feature-crew">Featured Crew</h4>
                <div class>
                  <div class="person-card box is-paddingless is-radiusless">
                    <div class="is-flex person-card-container">
                      <div class="about-person">
                        <h6 class="title is-6 is-marginless">{{ persons.crew[0].name }}</h6>
                        <p>{{ persons.crew[0].department }}</p>
                      </div>
                      <div>
                        <figure class="image is-48x48 is-marginless">
                          <img :src="persons.crew[0].profile_path" alt="person" />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="person-card box is-paddingless is-radiusless">
                    <div class="is-flex person-card-container">
                      <div class="about-person">
                        <h6 class="title is-6 is-marginless">{{ persons.crew[1].name }}</h6>
                        <p>{{ persons.crew[1].department }}</p>
                      </div>
                      <div>
                        <figure class="image is-48x48 is-marginless">
                          <img :src="persons.crew[1].profile_path" alt="person" />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="person-card box is-paddingless is-radiusless">
                    <div class="is-flex person-card-container">
                      <div class="about-person">
                        <h6 class="title is-6 is-marginless">{{ persons.crew[3].name }}</h6>
                        <p>{{ persons.crew[3].department }}</p>
                      </div>
                      <div>
                        <figure class="image is-48x48 is-marginless">
                          <img :src="persons.crew[3].profile_path" alt="person" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <b-collapse
                class="person-collapse"
                :open="false"
                position="is-bottom"
                aria-id="contentIdForA11y1"
              >
                <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                  <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                  {{ !props.open ? 'All options' : 'Fewer options' }}
                </a>
                <div
                  class="person-card box is-paddingless is-radiusless"
                  v-for="(person, index) in persons.crew"
                  :key="index"
                >
                  <div class="is-flex person-card-container">
                    <div class="about-person">
                      <h6 class="title is-6 is-marginless">{{ person.name }}</h6>
                      <p>{{ person.department }}</p>
                    </div>
                    <div>
                      <figure class="image is-48x48">
                        <img :src="person.profile_path" alt="person" />
                      </figure>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </section>
            <div></div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-9">
          <div class="bulled-cast">
            <div class="content">
              <h3>Top Bulled Cast</h3>
              <div class="is-flex">
                <div class="bullet-cast-persons box is-paddingless is-radiusless">
                  <figure class="is-marginless">
                    <img :src="persons.cast[0].profile_path" alt="person" />
                  </figure>
                  <h6 class="title is-6">{{ persons.cast[0].name }}</h6>
                  <p>{{ persons.cast[0].character }}</p>
                </div>
                <div class="bullet-cast-persons box is-paddingless is-radiusless">
                  <figure class="is-marginless">
                    <img :src="persons.cast[1].profile_path" alt="person" />
                  </figure>
                  <h6 class="title is-6">{{ persons.cast[1].name }}</h6>
                  <p>{{ persons.cast[1].character }}</p>
                </div>
                <div class="bullet-cast-persons box is-paddingless is-radiusless">
                  <figure class="is-marginless">
                    <img :src="persons.cast[2].profile_path" alt="person" />
                  </figure>
                  <h6 class="title is-6">{{ persons.cast[2].name }}</h6>
                  <p>{{ persons.cast[2].character }}</p>
                </div>
                <div class="bullet-cast-persons box is-paddingless is-radiusless">
                  <figure class="is-marginless">
                    <img :src="persons.cast[3].profile_path" alt="person" />
                  </figure>
                  <h6 class="title is-6">{{ persons.cast[3].name }}</h6>
                  <p>{{ persons.cast[3].character }}</p>
                </div>
                <div class="bullet-cast-persons box is-paddingless is-radiusless">
                  <figure class="is-marginless">
                    <img :src="persons.cast[4].profile_path" alt="person" />
                  </figure>
                  <h6 class="title is-6">{{ persons.cast[4].name }}</h6>
                  <p>{{ persons.cast[4].character }}</p>
                </div>
              </div>
            </div>
          </div>
          <b-carousel v-model="carousel" :autoplay="false">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
              <section :class="`hero is-medium is-${carousel.color} is-bold`">
                <div class="hero-body has-text-centered">
                  <iframe
                    width="637px"
                    height="361px"
                    :src="carousel.key"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </section>
            </b-carousel-item>
          </b-carousel>
        </div>
        <div class="column is-3 movie-details">
          <div>
            <h6 class="title is-6">Budget</h6>
            <p>{{ details.budget | putCommas}}</p>
          </div>
          <div>
            <h6 class="title is-6">Original Language</h6>
            <p>{{ details.spoken_languages[0].name }}</p>
          </div>
          <div>
            <h6 class="title is-6">Revenue</h6>
            <p>{{ details.revenue | putCommas}}</p>
          </div>
          <div>
            <h6 class="title is-6">Genres</h6>
            <div v-for="(genre, index) in details.genres" :key="index">
              <p>{{ genre.name }}</p>
            </div>
          </div>
          <div>
            <h6 class="title is-6">Homepage</h6>
            <a :href="details.homepage">{{ details.homepage | deleteHttp }}</a>
          </div>
          <div>
            <h6 class="title is-6">Production Companies</h6>
            <div v-for="(company, index) in details.production_companies" :key="index">
              <p>{{ company.name }}, {{ company.origin_country }}</p>
            </div>
          </div>
          <div>
            <h6 class="title is-6">Production Countries</h6>
            <div v-for="(countrie, index) in details.production_countries" :key="index">
              <p>{{ countrie.name }}, {{ countrie.iso_3166_1 }}</p>
            </div>
          </div>
          <div>
            <h6 class="title is-6">Runtime</h6>
            <p>{{ details.runtime }} min</p>
          </div>
          <div>
            <h6 class="title is-6">Status</h6>
            <p>{{ details.status }} min</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./navbar";

export default {
  components: { Navbar },
  props: ["id"],
  data() {
    return {
      carousel: 0,
      carousels: null,
      video: null,
      persons: null,
      details: null
    };
  },
  mounted() {
    function video(id) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US`
      );
    }
    function persons(id) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=baec18f2cd55d99c10dba80b4a887367`
      );
    }
    function details(id) {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=baec18f2cd55d99c10dba80b4a887367&language=en-US`
      );
    }

    axios
      .all([video(this.id), persons(this.id), details(this.id)])
      .then(
        axios.spread((...args) => {
          args[0].data.results.forEach(element => {
            element.key = `https://www.youtube.com/embed/${element.key}`;
          });
          args[1].data.cast.forEach(element => {
            element.profile_path = `https://image.tmdb.org/t/p/w138_and_h175_face${element.profile_path}`;
          });
          args[1].data.crew.forEach(elem => {
            elem.profile_path = `https://image.tmdb.org/t/p/w138_and_h175_face${elem.profile_path}`;
          });
          args[2].data.poster_path = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${args[2].data.poster_path}`;

          this.carousels = args[0].data.results;
          this.persons = args[1].data;
          this.details = args[2].data;
        })
      )
      .catch(error => window.console.log(error));
  },
  methods: {
    getYear(item) {
      let date = new Date(item);
      let year = date.toLocaleString("default", {
        year: "numeric"
      });
      return year;
    }
  },
  filters: {
    putCommas(value) {
      if (value) {
        return (
          "$" + value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
      } else {
        return "no data";
      }
    },
    deleteHttp(value) {
      if (value) {
        return value.replace(/(^\w+:|^)\/\//, "");
      } else {
        return "no data";
      }
    }
  }
};
</script>

<style scoped>
.content {
  margin-bottom: 0 !important;
}
.person-card {
  margin-right: 20px;
  width: 30%;
  display: inline-block;
}
.person-card-container {
  justify-content: space-between;
  margin-bottom: 20px;
}
.persons-card {
  margin-right: 20px;
  width: 30%;
  display: inline-block;
}
.about-person {
  margin: 5px 0px 0px 10px;
}
.feature-crew {
  margin-top: 20px;
}
.overview {
  margin-top: 20px;
}
.bullet-cast-persons {
  margin: 10px 10px 24px 0px;
}
.bullet-cast-persons img {
  width: 150px;
}
.carousel {
  height: 361px;
  width: 636px;
}
iframe {
  height: 361px;
  width: 636px;
  margin-right: auto;
}
.hero-body {
  padding: 0px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.movie-details div h6 {
  margin-top: 10px;
  margin-bottom: 5px;
}
.movie-details p {
  font-size: 14px;
}
.details-title {
  margin-bottom: 30px;
}
.details {
  margin-bottom: 50px;
}
</style>