<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainPage from "./components/MainPage.vue";

@Component({
  components: {
    MainPage,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  margin: 0rem;
  font-size: 160%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
