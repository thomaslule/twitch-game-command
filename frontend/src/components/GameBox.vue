<template>
  <div class="game-box">
    <p>{{ value.game }}</p>
    <div>
      <button type="button" v-on:click="onClickEdit" class="action-button">{{ $t("gameBox.edit") }}</button>
      <button
        type="button"
        v-on:click="onClickRemove"
        class="action-button"
      >{{ $t("gameBox.remove") }}</button>
    </div>
    <GameModal
      v-if="showModal"
      v-bind:gameDescription="value"
      v-on:cancel="onModalCancel"
      v-on:confirm="onModalConfirm"
    />
    <ConfirmModal
      v-if="showConfirmDeleteModal"
      v-on:cancel="onDeleteModalCancel"
      v-on:confirm="onDeleteModalConfirm"
      v-bind:question="$t('gameBox.areyousure', { game: value.game })"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GameDescription } from "../api";
import GameModal from "./GameModal.vue";
import ConfirmModal from "./ConfirmModal.vue";

@Component({
  components: {
    GameModal,
    ConfirmModal,
  },
})
export default class GameBox extends Vue {
  @Prop()
  public value!: GameDescription;
  public showModal = false;
  public showConfirmDeleteModal = false;

  public onClickEdit() {
    this.showModal = true;
  }

  public onClickRemove() {
    this.showConfirmDeleteModal = true;
  }

  public onModalCancel() {
    this.showModal = false;
  }

  public onModalConfirm(gameDescription: GameDescription) {
    this.showModal = false;
    this.$emit("input", gameDescription);
  }

  public onDeleteModalCancel() {
    this.showConfirmDeleteModal = false;
  }

  public onDeleteModalConfirm() {
    this.$emit("remove");
  }
}
</script>

<style scoped>
.game-box {
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 0.1rem solid #6c757d;
  border-radius: 0.5rem;
  width: 20rem;
  text-align: center;
}
.game-box button {
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
