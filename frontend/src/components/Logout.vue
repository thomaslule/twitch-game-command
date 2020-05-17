<template>
  <button v-on:click="logout">{{ $t("logout") }}</button>
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
