<template>
  <div id="app">
    <header>
      <div class="size-restrain">
        <ChangeLanguage />
        <Logout v-if="authenticated" />
      </div>
    </header>
    <section id="content">
      <div class="size-restrain">
        <Login v-if="!authenticated" />
        <ConfigForm v-if="authenticated" />
      </div>
    </section>
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
* {
  box-sizing: border-box;
}
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  background-color: #b151e6;
  display: flex;
  justify-content: center;
}
#content {
  display: flex;
  justify-content: center;
}
.size-restrain {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
}
</style>
