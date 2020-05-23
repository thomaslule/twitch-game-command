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
button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  cursor: pointer;
  color: rgb(108, 117, 125);
  background-color: rgb(255, 255, 255);
  border: 0.1rem solid rgb(108, 117, 125);
}
button:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(109, 118, 126);
  border: 0.1rem solid rgb(108, 117, 125);
}
button[disabled] {
  cursor: default;
  color: rgba(108, 117, 125, 0.33);
  background-color: rgb(255, 255, 255);
  border: 0.1rem solid rgba(108, 117, 125, 0.33);
}
.modal-background {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  text-align: left;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  margin: 0rem auto;
  padding: 2rem 3rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.33);
  width: 50rem;
}
</style>
