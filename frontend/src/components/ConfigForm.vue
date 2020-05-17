<template>
  <form v-if="loaded" v-on:submit.prevent="onSubmit" class="confirm-form">
    <div class="column-fields">
      <div class="field-group header-group">
        <label for="field-command">{{ $t("configForm.command") }}</label>
        <input v-model="config.command" id="field-command" />
      </div>

      <div class="field-group header-group">
        <label for="field-default-description">{{ $t("configForm.defaultDescription") }}</label>
        <textarea v-model="config.defaultDescription" id="field-default-description" />
      </div>

      <ul>
        <li
          v-for="(gameDescription, index) in config.gameDescriptions"
          :key="`gameDescription-${index}`"
          class="field-group game-group"
        >
          <div class="game-group-column-button">
            <button
              type="button"
              v-on:click="deleteLine(index)"
              class="action-button"
            >{{ $t("configForm.delete") }}</button>
          </div>
          <div class="game-group-column-fields">
            <input
              v-model="gameDescription.game"
              required
              v-bind:placeholder="$t('configForm.game')"
            />
            <textarea
              v-model="gameDescription.description"
              v-bind:placeholder="$t('configForm.description')"
            />
          </div>
        </li>
        <li class="field-group game-group">
          <div class="game-group-column-button">
            <button
              type="button"
              v-on:click="addLine"
              class="action-button"
            >{{ $t("configForm.add") }}</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="column-submit">
      <button type="submit" class="save-button" :disabled="submitting">
        <span v-if="!submitting">{{ $t("configForm.save") }}</span>
        <img v-if="submitting" src="/spinner.webp" class="spinner" />
      </button>
    </div>
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
  public submitting = false;

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
      this.submitting = true;
      await Promise.all([
        postConfig(this.config),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      this.submitting = false;
    }
  }
}
</script>

<style scoped>
.confirm-form {
  display: flex;
  margin: 20px;
  width: 100%;
}
.column-submit {
  width: 20%;
}
.column-fields {
  width: 80%;
}
.field-group {
  margin-bottom: 20px;
}
.header-group {
  margin-left: 150px;
}
.game-group {
  display: flex;
}
.game-group-column-button {
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
.game-group-column-fields {
  flex-grow: 1;
}
.confirm-form ul {
  list-style-type: none;
  padding: 0px;
}
.confirm-form input {
  display: block;
  margin-bottom: 5px;
  padding: 5px;
}
.confirm-form textarea {
  display: block;
  width: 80%;
  height: 50px;
  padding: 5px;
  font-family: Arial;
}
.confirm-form button {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
}
.save-button {
  color: white;
  background-color: #45bd5f;
  border: none;
}
.save-button:hover {
  color: #45bd5f;
  background-color: white;
  border: 1px solid #45bd5f;
}
.save-button[disabled] {
  color: white;
  background-color: #45bd5f;
  border: none;
  cursor: default;
}
.action-button {
  margin-right: 5px;
  background-color: transparent;
  color: #6c757d;
  border: 1px solid #6c757d;
}
.action-button:hover {
  background-color: #6c757d;
  color: white;
}
.spinner {
  width: 30px;
  height: 30px;
}
</style>