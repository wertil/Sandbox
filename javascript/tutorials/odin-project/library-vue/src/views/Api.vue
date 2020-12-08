<template>
    <div class="container mt-3">

        <form class="mb-1" @submit.prevent="fetchWeather">
            <input type="text" v-model="searchTermWeather">
            <button>Get Weather</button>
        </form>

        <div class="weather" v-if="weatherData">
            <p>temperatur in {{ weatherData.name }}: {{ temperatur }}</p>
        </div>

        <form class="mb-2" @submit.prevent="fetchGif">
            <input type="text" v-model="searchTermGif">
            <button>Get Gif</button>
        </form>


        <div class="gif" v-if="gif">
            <p><img :src="getGif" alt=""></p>
        </div>
    </div>
</template>
<script>

import {apiKeys} from "../keys";

export default {
    name: "Api",
    data() {
        return {
            weatherData: null,
            gif: null,
            searchTermWeather: 'Leipzig',
            searchTermGif: 'cats'
        }
    },
    methods: {
        fetchWeather() {
            const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.searchTermWeather}&appid=${apiKeys.openWeatherMap}`;
            fetch(weatherApiUrl, {mode: 'cors'})
                .then(response => response.json())
                .then(response => this.weatherData = response)
                .catch(function (err) {
                    console.log("error weather", err);
                });
        },
        fetchGif() {
            const giffyApiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKeys.giphy}&s=${this.searchTermGif}`;
            fetch(giffyApiUrl, {mode: 'cors'})
                .then(response => response.json())
                .then(response => this.gif = response)
                .catch(function (err) {
                    console.log("error weather", err);
                });
        }
    },
    computed: {
        temperatur() {
            return (this.weatherData.main.temp - 273.15).toFixed(1) + " °C";
        },
        getGif() {
            return this.gif.data.images.original.url
        }
    },
    mounted() {

       this.fetchWeather();
       this.fetchGif();

    }
}
</script>