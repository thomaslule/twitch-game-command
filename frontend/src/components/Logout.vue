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
  color: white;
  background-color: transparent;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
}
.button:hover {
  color: black;
  background-color: white;
}
</style>