<template>
  <div id="app">
    <ChangeLanguage />
    <Login v-if="!authenticated" />
    <Logout v-if="authenticated" />
    <ConfigForm v-if="authenticated" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangeLanguage from "./components/ChangeLanguage.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import ConfigForm from "./components/ConfigForm.vue";
import { isAuthenticated } from "./auth";

@Component({
  components: {
    ChangeLanguage,
    Login,
    Logout,
    ConfigForm,
  },
})
export default class App extends Vue {
  public authenticated = isAuthenticated();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
