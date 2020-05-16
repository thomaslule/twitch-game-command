<template>
  <div v-if="descriptions">
    <button v-on:click="update">Update</button>
    <ul>
      <li v-for="description in descriptions" :key="description.game">
        <input v-model="description.game" />
        <br />
        <textarea v-model="description.text" />
        <br />
        <button v-on:click="deleteLine(description.game)">Delete</button>
      </li>
    </ul>
    <button v-on:click="addLine">Add</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Descriptions extends Vue {
  public descriptions = [{ game: "Game 1", text: "description 1" }];

  public mounted() {
    fetch("http://localhost:3000/descriptions")
      .then((res) => res.json())
      .then((descriptions) => {
        this.descriptions = descriptions;
      })
      .catch((err) => console.error(err));
  }

  public deleteLine(game: string) {
    this.descriptions = this.descriptions.filter(
      (description) => description.game !== game
    );
  }

  public addLine() {
    this.descriptions = this.descriptions.concat({ game: "", text: "" });
  }

  public update() {
    fetch("http://localhost:3000/descriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.descriptions),
    }).catch((err) => console.error(err));
  }
}
</script>
