<template>
  <form v-if="loaded" v-on:submit.prevent="onSubmit">
    <button type="submit">{{ $t("configForm.save") }}</button>
    <br />
    {{ $t("configForm.command") }}
    <input v-model="config.command" />
    <ul>
      <li>
        {{ $t("configForm.defaultDescription") }}
        <br />
        <textarea v-model="config.defaultDescription" />
      </li>
      <li
        v-for="(gameDescription, index) in config.gameDescriptions"
        :key="`gameDescription-${index}`"
      >
        {{ $t("configForm.game") }}
        <input v-model="gameDescription.game" required />
        <br />
        {{ $t("configForm.description") }}
        <textarea v-model="gameDescription.description" />
        <br />
        <button type="button" v-on:click="deleteLine(index)">{{ $t("configForm.delete") }}</button>
      </li>
    </ul>
    <button type="button" v-on:click="addLine">{{ $t("configForm.add") }}</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Config, getConfig, postConfig } from "../api";

@Component
export default class ConfigForm extends Vue {
  public config: Config = {
    command: "",
    defaultDescription: "",
    gameDescriptions: [],
  };
  public loaded = false;

  public async mounted() {
    try {
      this.config = await getConfig();
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }

  public deleteLine(index: number) {
    this.config.gameDescriptions.splice(index, 1);
  }

  public addLine() {
    this.config.gameDescriptions.push({ game: "", description: "" });
  }

  public async onSubmit() {
    try {
      await postConfig(this.config);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
