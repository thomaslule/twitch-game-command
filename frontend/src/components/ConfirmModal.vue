<template>
  <div class="modal-background">
    <div class="modal-wrapper">
      <form class="modal-container confirm-modal" v-on:submit.prevent="confirm">
        <p>{{ question }}</p>
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
export default class ConfirmModal extends Vue {
  @Prop()
  public question!: string;

  @Emit("cancel")
  public cancel() {
    return undefined;
  }
  @Emit("confirm")
  public confirm() {
    return undefined;
  }
}
</script>

<style scoped>
.confirm-modal {
  width: 30rem;
}
.action-buttons {
  text-align: right;
}
</style>
