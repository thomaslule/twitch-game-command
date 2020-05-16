<template>
  <div v-if="loaded">
    <button v-on:click="update">Update</button>
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
        <input v-model="gameDescription.game" />
        <br />
        <textarea v-model="gameDescription.text" />
        <br />
        <button v-on:click="deleteLine(index)">Delete</button>
      </li>
    </ul>
    <button v-on:click="addLine">Add</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Config, getConfig, postConfig } from "../api";

@Component
export default class ConfigForm extends Vue {
  public config: Config = {
    defaultDescription: "",
    gameDescriptions: [],
  };
  public loaded = false;

  public async mounted() {
    try {
      const descriptions = await getConfig();
      this.config = descriptions;
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

  public async update() {
    try {
      await postConfig(this.config);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
