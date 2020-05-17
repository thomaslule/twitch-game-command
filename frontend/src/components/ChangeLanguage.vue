<template>
  <form class="form">
    <label for="change-language-select" class="label">{{ $t("changeLanguage") }}</label>
    <select
      v-model="$i18n.locale"
      v-on:change="onChange"
      id="change-language-select"
      class="select"
    >
      <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setSelectedLocale } from "../selectedLocaleStore";

@Component
export default class ChangeLanguage extends Vue {
  public onChange(event: any) {
    setSelectedLocale(event.target.value);
  }
}
</script>

<style scoped>
.form {
  padding: 20px;
}
.label {
  color: white;
  margin-right: 10px;
}
.select {
  border-radius: 0.5rem;
  padding: 5px;
}
</style>