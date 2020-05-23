<template>
  <button v-on:click="logout" class="button">{{ $t("logout") }}</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { logout } from "../auth";

@Component
export default class Logout extends Vue {
  public logout() {
    logout();
  }
}
</script>

<style scoped>
.button {
  margin: 2rem 2rem 2rem auto;
  color: rgb(255, 255, 255);
  background-color: rgb(177, 81, 230);
  border: 0.1rem solid rgb(255, 255, 255);
}
.button:hover {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
}
</style>