<template>
  <div class="modal-background" v-on:click="cancel">
    <div class="modal-wrapper">
      <form class="game-modal modal-container" v-on:submit.prevent="confirm" v-on:click.stop>
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

  public async mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  public destroyed() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  @Emit("cancel")
  public cancel() {
    return undefined;
  }

  @Emit("confirm")
  public confirm() {
    return this.value;
  }

  private handleKeydown(event: any) {
    if (event.keyCode === 27) {
      this.$emit("cancel");
    }
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
