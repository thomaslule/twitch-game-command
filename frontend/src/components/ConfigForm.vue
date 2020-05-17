<template>
  <form v-if="loaded" v-on:submit.prevent="onSubmit">
    <button type="submit">Update</button>
    <br />Command
    <input v-model="config.command" />
    <ul>
      <li>
        Default text
        <br />
        <textarea v-model="config.defaultDescription" />
      </li>
      <li
        v-for="(gameDescription, index) in config.gameDescriptions"
        :key="`gameDescription-${index}`"
      >
        <input v-model="gameDescription.game" required />
        <br />
        <textarea v-model="gameDescription.description" />
        <br />
        <button type="button" v-on:click="deleteLine(index)">Delete</button>
      </li>
    </ul>
    <button type="button" v-on:click="addLine">Add</button>
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
