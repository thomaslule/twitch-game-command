<template>
  <div class="config-form">
    <div class="notification-container">
      <div v-if="loading || saving" class="notification">
        <img src="/spinner.webp" class="spinner" />
      </div>
      <div v-if="showSavedNotification" class="notification">{{ $t("configForm.saved") }}</div>
    </div>
    <form v-if="!loading" v-on:submit.prevent="onSubmitMainConfig" class="main-config">
      <div class="field-group">
        <label v-bind:for="_uid + '-command'">{{ $t("configForm.command") }}</label>
        <input v-model="config.command" v-bind:id="_uid + '-command'" />
      </div>

      <div class="field-group">
        <label v-bind:for="_uid + '-cooldown'">{{ $t("configForm.cooldown") }}</label>
        <input v-model="config.cooldown" v-bind:id="_uid + '-cooldown'" />
      </div>

      <div class="field-group">
        <label v-bind:for="_uid + '-default-description'">{{ $t("configForm.defaultDescription") }}</label>
        <textarea v-model="config.defaultDescription" v-bind:id="_uid + '-default-description'" />
      </div>

      <button type="submit" v-bind:disabled="saving">{{ $t("configForm.save") }}</button>
      <p v-if="error">{{ $t("error") }}</p>
    </form>
    <ul v-if="!loading" class="games-list">
      <li
        v-for="(gameDescription, index) in config.gameDescriptions"
        :key="`gameDescription-${index}`"
        class="game-box"
      >
        <GameBox
          v-bind:value="gameDescription"
          v-on:input="onEditGame(index, $event)"
          v-on:remove="onRemoveGame(index)"
        />
      </li>
      <li class="add-game-box">
        <button type="button" v-on:click="onClickAddGame">{{ $t("configForm.add") }}</button>
        <GameModal v-if="showAddModal" v-on:cancel="onModalCancel" v-on:confirm="onModalConfirm" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameField from "./GameField.vue";
import GameBox from "./GameBox.vue";
import GameModal from "./GameModal.vue";
import { Config, getConfig, postConfig, GameDescription } from "../api";

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
    cooldown: 0,
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
  width: 100%;
}
.main-config {
  border: 0.1rem solid rgb(108, 117, 125);
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
  flex-wrap: wrap;
}
.add-game-box {
  display: flex;
  width: 20rem;
  height: 12rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border: 0.1rem solid rgb(108, 117, 125);
  border-radius: 0.5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  height: 8rem;
  padding: 0.5rem;
  font-family: Arial;
}
.spinner {
  width: 3rem;
  height: 3rem;
}
.notification-container {
  position: absolute;
  width: 100%;
  max-width: 120rem;
  display: flex;
  justify-content: flex-end;
}
.notification {
  margin-top: 2rem;
  margin-right: 5rem;
  padding: 1rem;
  background-color: rgb(69, 189, 95);
  color: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
</style>
