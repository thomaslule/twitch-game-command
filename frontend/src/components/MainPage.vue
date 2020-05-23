<template>
  <div class="main-page">
    <header class="header">
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
import ChangeLanguage from "./ChangeLanguage.vue";
import Login from "./Login.vue";
import Logout from "./Logout.vue";
import ConfigForm from "./ConfigForm.vue";
import { isAuthenticated } from "../auth";

@Component({
  components: {
    ChangeLanguage,
    Login,
    Logout,
    ConfigForm,
  },
})
export default class MainPage extends Vue {
  public authenticated = isAuthenticated();
}
</script>

<style scoped>
.header {
  background-color: #b151e6;
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  justify-content: center;
}
.size-restrain {
  width: 100%;
  max-width: 120rem;
  display: flex;
  align-items: center;
}
</style>
