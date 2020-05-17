<template>
  <div class="login-container">
    <a v-if="loaded" v-bind:href="twitchUrl">{{ $t("login") }}</a>
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
  margin-top: 50px;
  width: 100%;
}
.login-container a {
  color: white;
  background-color: #b151e6;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
}
.login-container a:hover {
  color: #b151e6;
  background-color: white;
  border: 1px solid #b151e6;
}
</style>