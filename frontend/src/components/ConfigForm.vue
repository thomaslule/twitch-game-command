<template>
  <div class="config-form">
    <div v-if="loading || saving" class="notification">
      <img src="/spinner.webp" class="spinner" />
    </div>
    <div v-if="showSavedNotification" class="notification">{{ $t("configForm.saved") }}</div>
    <form v-if="!loading" v-on:submit.prevent="onSubmitMainConfig" class="main-config">
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

      <button type="submit" class="save-button" v-bind:disabled="saving">{{ $t("configForm.save") }}</button>
      <p v-if="error">{{ $t("error") }}</p>
    </form>
    <ul v-if="!loading" class="games-list">
      <li
        v-for="(gameDescription, index) in config.gameDescriptions"
        :key="`gameDescription-${index}`"
      >
        <GameBox
          v-bind:value="gameDescription"
          v-on:input="onEditGame(index, $event)"
          v-on:remove="onRemoveGame(index)"
        />
      </li>
      <li>
        <div>
          <button
            type="button"
            v-on:click="onClickAddGame"
            class="action-button"
          >{{ $t("configForm.add") }}</button>
          <GameModal v-if="showAddModal" v-on:cancel="onModalCancel" v-on:confirm="onModalConfirm" />
        </div>
      </li>
    </ul>
  </div>
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
  public loading = true;
  public saving = false;
  public error = false;
  public showSavedNotification = false;

  public async mounted() {
    try {
      this.config = await getConfig();
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  public async onEditGame(index: number, value: GameDescription) {
    Vue.set(this.config.gameDescriptions, index, value);
    await this.saveConfig();
  }

  public async onRemoveGame(index: number) {
    this.config.gameDescriptions.splice(index, 1);
    await this.saveConfig();
  }

  public onClickAddGame() {
    this.showAddModal = true;
  }

  public onModalCancel() {
    this.showAddModal = false;
  }

  public async onModalConfirm(newGameDescription: GameDescription) {
    this.config.gameDescriptions.push(newGameDescription);
    this.showAddModal = false;
    await this.saveConfig();
  }

  public async onSubmitMainConfig() {
    await this.saveConfig();
  }

  private async saveConfig() {
    try {
      this.error = false;
      this.saving = true;
      await postConfig(this.config);
      this.saving = false;
      this.showSavedNotification = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.showSavedNotification = false;
    } catch (error) {
      console.error(error);
      this.error = true;
      this.saving = false;
    }
  }
}
</script>

<style scoped>
.config-form {
  padding: 2rem;
}
.main-config {
  border: 0.1rem solid #6c757d;
  border-radius: 0.5rem;
  padding: 1rem;
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
.config-form ul {
  list-style-type: none;
  padding: 0rem;
}
.config-form input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
.config-form textarea {
  display: block;
  width: 80%;
  height: 5rem;
  padding: 0.5rem;
  font-family: Arial;
}
.config-form button {
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
  border: 0.1rem solid #45bd5f;
}
.save-button:hover {
  color: #45bd5f;
  background-color: white;
  border: 0.1rem solid #45bd5f;
}
.save-button[disabled] {
  color: white;
  background-color: #6c757d;
  border: 0.1rem solid #6c757d;
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
.notification {
  position: absolute;
  margin: 0rem;
  right: 10rem;
  padding: 1rem;
  background-color: #45bd5f;
  color: white;
  border-radius: 0.5rem;
}
</style>
