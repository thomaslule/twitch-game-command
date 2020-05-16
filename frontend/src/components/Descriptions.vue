<template>
  <div v-if="loaded">
    <button v-on:click="update">Update</button>
    <ul>
      <li>
        Default text
        <br />
        <textarea v-model="data.defaultText" />
      </li>
      <li
        v-for="(description, index) in data.descriptions"
        :key="`description-${index}`"
      >
        <input v-model="description.game" />
        <br />
        <textarea v-model="description.text" />
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
export default class Descriptions extends Vue {
  public data: Data = { defaultText: "", descriptions: [] };
  public loaded = false;

  public mounted() {
    fetch("http://localhost:3000/descriptions")
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.loaded = true;
      })
      .catch((err) => console.error(err));
  }

  public deleteLine(index: number) {
    this.data.descriptions.splice(index, 1);
  }

  public addLine() {
    this.data.descriptions.push({ game: "", text: "" });
  }

  public update() {
    fetch("http://localhost:3000/descriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.data),
    }).catch((err) => console.error(err));
  }
}

interface Data {
  defaultText: string;
  descriptions: Description[];
}

interface Description {
  game: string;
  text: string;
}
</script>
