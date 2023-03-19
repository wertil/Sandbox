<script lang="ts" setup>
const user = useUser();
</script>

<template>
  <nav>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/movies">Movies</nuxt-link>
    <nuxt-link to="/admin">Admin</nuxt-link>
    <nuxt-link to="/login" v-if="!user.isLoggedIn">Login</nuxt-link>
    <a href="#" v-else @click.prevent="user.isLoggedIn = false">Logout</a>
  </nav>
 <slot />
</template>

<style scoped></style>
