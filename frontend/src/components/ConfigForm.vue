<template>
  <form v-if="loaded" v-on:submit.prevent="onSubmit" class="confirm-form">
    <div class="column-fields">
      <div class="field-group">
        <label for="field-command">{{ $t("configForm.command") }}</label>
        <input v-model="config.command" id="field-command" />
      </div>

      <div class="field-group">
        <label for="field-default-description">
          {{
          $t("configForm.defaultDescription")
          }}
        </label>
        <textarea v-model="config.defaultDescription" id="field-default-description" />
      </div>

      <ul class="games-list">
        <li
          v-for="(gameDescription, index) in config.gameDescriptions"
          :key="`gameDescription-${index}`"
        >
          <GameBox v-model="config.gameDescriptions[index]" v-on:remove="onRemoveGame(index)" />
        </li>
        <li>
          <div>
            <button
              type="button"
              v-on:click="onClickAddGame"
              class="action-button"
            >{{ $t("configForm.add") }}</button>
            <GameModal
              v-if="showAddModal"
              v-on:cancel="onModalCancel"
              v-on:confirm="onModalConfirm"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="column-submit">
      <button type="submit" class="save-button" :disabled="submitting">
        <span v-if="!submitting">{{ $t("configForm.save") }}</span>
        <img v-if="submitting" src="/spinner.webp" class="spinner" />
      </button>
      <p v-if="error">{{ $t("error") }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameField from "./GameField.vue";
import GameBox from "./GameBox.vue";
import GameModal from "./GameModal.vue";
import { Config, getConfig, postConfig } from "../api";
import { GameDescription } from "../../../backend/src/Config";

@Component({
  components: {
    GameField,
    GameBox,
    GameModal,
  },
})
export default class ConfigForm extends Vue {
  public config: Config = {
    command: "",
    defaultDescription: "",
    gameDescriptions: [],
  };
  public showAddModal = false;
  public loaded = false;
  public submitting = false;
  public error = false;

  public async mounted() {
    try {
      this.config = await getConfig();
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }

  public onRemoveGame(index: number) {
    this.config.gameDescriptions.splice(index, 1);
  }

  public onClickAddGame() {
    this.showAddModal = true;
  }

  public onModalCancel() {
    this.showAddModal = false;
  }

  public onModalConfirm(newGameDescription: GameDescription) {
    this.config.gameDescriptions.push(newGameDescription);
    this.showAddModal = false;
  }

  public async onSubmit() {
    try {
      this.error = false;
      this.submitting = true;
      await Promise.all([
        postConfig(this.config),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    } catch (error) {
      console.error(error);
      this.error = true;
    } finally {
      this.submitting = false;
    }
  }
}
</script>

<style scoped>
.confirm-form {
  display: flex;
  margin: 2rem;
  width: 100%;
}
.column-submit {
  width: 20%;
}
.column-fields {
  width: 80%;
}
.field-group {
  margin-bottom: 2rem;
}
.game-group {
  display: flex;
}
.games-list {
  display: flex;
}
.confirm-form ul {
  list-style-type: none;
  padding: 0rem;
}
.confirm-form input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
.confirm-form textarea {
  display: block;
  width: 80%;
  height: 5rem;
  padding: 0.5rem;
  font-family: Arial;
}
.confirm-form button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
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
  border: 0.1rem solid #45bd5f;
}
.save-button[disabled] {
  color: white;
  background-color: #45bd5f;
  border: none;
  cursor: default;
}
.action-button {
  background-color: transparent;
  color: #6c757d;
  border: 0.1rem solid #6c757d;
}
.action-button:hover {
  background-color: #6c757d;
  color: white;
}
.spinner {
  width: 3rem;
  height: 3rem;
}
</style>
