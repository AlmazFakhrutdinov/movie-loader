import MovieOptions from '../components/movie-options'
import First from '../components/first'
import Second from '../components/second'
import MovieInfo from '../components/movie-info'

export const routes = [
  {
    path: '/',
    component: MovieOptions,
    children: [
      {
        path: '/',
        component: First
      },
      {
        path: '/second-option',
        component: Second
      },
    ]
  },
  {
    path: '/movieInfo/:id',
    component: MovieInfo,
    props: true
  }
  
]