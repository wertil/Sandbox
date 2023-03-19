<script setup lang="ts">
import { dataToEsm } from '@rollup/pluginutils';

interface Movie {
  Title: string,
  BoxOffice: string,
  Poster: string,
  Error: string;

}

const route = useRoute();

// above same as this:
const url = `http://www.omdbapi.com/?apikey=7e123fb5&i=${route.params.id}`;
const url500 = 'https://httpbin.org/status/500'
const {data, error} = await useFetch<Movie>(url, {
  pick: ['Title', 'BoxOffice', 'Poster', 'Error'],
  key:  `/movies/${route.params.id}`,
})

// fetch error
if(error.value) {
  console.log(error.value);
}

// response error
if(data.value?.Error === 'Incorrect IMDb ID.') {
  showError({statusCode: 404, statusMessage: 'Page not found'})
}

useHead({
  title: data.value?.Title,
})
</script>

<template>
  <div v-if="data">
    <h1>{{ data.Title }}</h1>
    <p>Box Office: {{ data.BoxOffice }}</p>
    <div class="content">
     <img :src="data.Poster" />
     <pre>{{ data }}</pre>
    </div>

  </div>
</template>

<style scoped>
.content {
  display: flex;
  overflow: hidden;
}
</style>
