<template>
  <form class="form">
    <label v-bind:for="_uid + '-language'" class="label">{{ $t("changeLanguage") }}</label>
    <select
      v-model="$i18n.locale"
      v-on:change="onChange"
      v-bind:id="_uid + '-language'"
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
  padding: 2rem;
}
.label {
  color: rgb(255, 255, 255);
  margin-right: 1rem;
}
.select {
  border-radius: 0.5rem;
  padding: 0.5rem;
}
</style>