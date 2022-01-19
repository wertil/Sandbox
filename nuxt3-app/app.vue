<template>
    <div>
       <Navigation />
        <NuxtPage/>
        <Settings/>
    </div>
</template>

<script lang="ts">
import Navigation from '~/components/Navigation.vue'; // import not necessary for nuxt3 but for webstorm
import Settings from '~/components/Settings.vue';

export default {
  components: { Navigation, Settings }
};
</script>

<style lang="scss">
  @import "scss/main";
</style>

