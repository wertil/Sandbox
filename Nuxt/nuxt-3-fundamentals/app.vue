<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/movies">Movies</nuxt-link>
    </nav>
   <nuxt-page />
  </div>
</template>

<style>
body {
  background: black;
  color: white;
  font-size: 1.3rem;
  padding: 1rem;
}

a {
  color: cornflowerblue;
  padding-right: 0.5rem;
}

</style>
