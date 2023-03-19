<script lang="ts" setup>
import { serial } from 'hookable';


interface Movie {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string,
}

interface SearchResponse {
  Search: Movie[],
  totalResults: string,
}

const query = ref('beavis');
const movies = ref<Movie[]>();
async function search() {
  const { Search } = await $fetch(`http://www.omdbapi.com/?apikey=7e123fb5&s=${query.value}`) as SearchResponse;
  movies.value = Search;
}
search();
</script>

<template>
  <form @submit.prevent="search">
    <input type="text" v-model="query">

    <ul>
      <li v-for="movie in movies" :key="movie.imdbID">
        <NuxtLink :to="{name: 'movies-id', params: { id: movie.imdbID}}">
          <img :src="movie.Poster" :alt="movie.Title">
        </NuxtLink>        
      </li>
    </ul>

  </form>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(5, minmax(10vw,20vw));
  gap: 1rem;
}

li {  
  list-style: none;
}

img {
  width: 100%;
}
</style>
