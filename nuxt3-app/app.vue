<template>
    <div>
       <Navigation />
        <NuxtPage/>
        <Settings/>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';



onBeforeMount(() => {
 
});

</script>

<style lang="scss">
  @import "scss/main";
</style>

