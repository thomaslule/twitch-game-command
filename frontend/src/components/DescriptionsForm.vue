<template>
  <div v-if="loaded">
    <button v-on:click="update">Update</button>
    <ul>
      <li>
        Default text
        <br />
        <textarea v-model="descriptions.defaultDescription" />
      </li>
      <li
        v-for="(gameDescription, index) in descriptions.gameDescriptions"
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
import { Descriptions, getDescriptions, postDescriptions } from "../api";

@Component
export default class DescriptionsForm extends Vue {
  public descriptions: Descriptions = {
    defaultDescription: "",
    gameDescriptions: [],
  };
  public loaded = false;

  public async mounted() {
    try {
      const descriptions = await getDescriptions();
      this.descriptions = descriptions;
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }

  public deleteLine(index: number) {
    this.descriptions.gameDescriptions.splice(index, 1);
  }

  public addLine() {
    this.descriptions.gameDescriptions.push({ game: "", description: "" });
  }

  public async update() {
    try {
      await postDescriptions(this.descriptions);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
