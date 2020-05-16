<template>
  <div id="app">
    <DescriptionsForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DescriptionsForm from "./components/DescriptionsForm.vue";

@Component({
  components: {
    DescriptionsForm,
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
