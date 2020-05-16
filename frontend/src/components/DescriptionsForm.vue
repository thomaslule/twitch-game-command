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

@Component
export default class DescriptionsForm extends Vue {
  public descriptions: Descriptions = {
    defaultDescription: "",
    gameDescriptions: [],
  };
  public loaded = false;

  public mounted() {
    fetch("http://localhost:3000/descriptions")
      .then((res) => res.json())
      .then((descriptions) => {
        this.descriptions = descriptions;
        this.loaded = true;
      })
      .catch((err) => console.error(err));
  }

  public deleteLine(index: number) {
    this.descriptions.gameDescriptions.splice(index, 1);
  }

  public addLine() {
    this.descriptions.gameDescriptions.push({ game: "", description: "" });
  }

  public update() {
    fetch("http://localhost:3000/descriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.descriptions),
    }).catch((err) => console.error(err));
  }
}

interface Descriptions {
  defaultDescription: string;
  gameDescriptions: GameDescription[];
}

interface GameDescription {
  game: string;
  description: string;
}
</script>
