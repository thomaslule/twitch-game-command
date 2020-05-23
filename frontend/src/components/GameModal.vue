<template>
  <div class="modal-background">
    <div class="modal-wrapper">
      <form class="game-modal modal-container" v-on:submit.prevent="confirm">
        <div class="field-group">
          <label v-bind:for="_uid + '-game'">{{ $t("gameModal.game") }}</label>
          <GameField v-model="value.game" v-bind:id="_uid + '-game'" />
        </div>
        <div class="field-group">
          <label v-bind:for="_uid + '-description'">{{ $t("gameModal.description") }}</label>
          <textarea v-model="value.description" v-bind:id="_uid + '-description'" />
        </div>
        <div class="action-buttons">
          <button type="button" v-on:click="cancel">{{ $t("cancel") }}</button>
          <button type="submit">{{ $t("confirm") }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import GameField from "./GameField.vue";
import { GameDescription } from "../api";

@Component({
  components: {
    GameField,
  },
})
export default class GameModal extends Vue {
  @Prop()
  public gameDescription!: GameDescription;
  public value = this.gameDescription
    ? { ...this.gameDescription }
    : { game: "", description: "" };

  @Emit("cancel")
  public cancel() {
    return undefined;
  }
  @Emit("confirm")
  public confirm() {
    return this.value;
  }
}
</script>

<style scoped>
.field-group {
  margin-bottom: 2rem;
}
.action-buttons {
  text-align: right;
}
.game-modal textarea {
  margin-bottom: 2rem;
  display: block;
  width: 100%;
  height: 8rem;
  padding: 0.5rem;
  font-family: Arial;
}
</style>
