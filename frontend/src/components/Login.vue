<template>
  <div class="login-container">
    <a v-if="loaded" v-bind:href="twitchUrl" class="button">{{ $t("login") }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  generateAndSaveRandomState,
  isRandomStateEqualTo,
  authenticate,
} from "../auth";
import { getClientId } from "../api";

@Component
export default class Login extends Vue {
  public loaded = false;
  public twitchUrl = "";

  public mounted() {
    const token = this.getHashParam("access_token");
    if (!token) {
      console.log("No token found in hash");
      this.prepareAuthLink();
      return;
    }
    const randomState = this.getHashParam("state")!;
    if (!isRandomStateEqualTo(randomState)) {
      console.error("Invalid state param received in hash");
      this.prepareAuthLink();
      return;
    }
    authenticate(token);
  }

  private getHashParam(paramName: string) {
    const tokenMatch = window.location.hash.match(
      new RegExp(`[&#]${paramName}=([^&]+)`)
    );
    return tokenMatch ? tokenMatch[1] : undefined;
  }

  private async prepareAuthLink() {
    const clientId = await getClientId();
    const randomState = generateAndSaveRandomState();
    const host = window.location.origin;
    this.twitchUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${host}&response_type=token&scope=&force_verify=true&state=${randomState}`;
    this.loaded = true;
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  width: 100%;
}
.button {
  text-decoration: none;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  cursor: pointer;
  color: rgb(255, 255, 255);
  background-color: rgb(177, 81, 230);
  border: 0.1rem solid rgb(255, 255, 255);
}
.button:hover {
  color: rgb(177, 81, 230);
  background-color: rgb(255, 255, 255);
  border: 0.1rem solid rgb(177, 81, 230);
}
</style>