<template>
  <div class="game-modal">
    <div class="modal-wrapper">
      <form class="modal-container" v-on:submit.prevent="confirm">
        <GameField v-model="value.game" />
        <textarea v-model="value.description" v-bind:placeholder="$t('configForm.description')" />
        <div class="action-buttons">
          <button
            type="button"
            v-on:click="cancel"
            class="action-button"
          >{{ $t("gameModal.cancel") }}</button>
          <button type="submit" class="action-button">{{ $t("gameModal.confirm") }}</button>
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
.game-modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  text-align: left;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 30rem;
  margin: 0rem auto;
  padding: 2rem 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.33);
}
.game-modal button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
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
</style>
