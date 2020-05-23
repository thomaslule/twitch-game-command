<template>
  <div class="game-box">
    <p class="game-name" v-bind:title="value.game">{{ value.game }}</p>
    <div>
      <button type="button" v-on:click="onClickEdit">{{ $t("gameBox.edit") }}</button>
      <button type="button" v-on:click="onClickRemove">{{ $t("gameBox.remove") }}</button>
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
  width: 20rem;
  height: 12rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 0.1rem solid rgb(108, 117, 125);
  border-radius: 0.5rem;
  text-align: center;
}
.game-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
