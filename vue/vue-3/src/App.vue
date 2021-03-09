<template>
    <CompositionAPI />
    <CompositionAPI_Import />
    <CompositionAPI_Reactive />
</template>

<script>
import CompositionAPI from "@/components/CompositionAPI";
import CompositionAPI_Reactive from "@/components/CompositionAPI_Reactive";
import CompositionAPI_Import from "@/components/CompositionAPI_Import";

export default {
  name: 'App',
  components: {
      CompositionAPI_Import,
      CompositionAPI_Reactive,
      CompositionAPI
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
