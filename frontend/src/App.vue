<template>
  <div id="app">
    <Descriptions />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Descriptions from "./components/Descriptions.vue";

@Component({
  components: {
    Descriptions,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
