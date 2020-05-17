<template>
  <div>
    <select v-model="$i18n.locale" v-on:change="onChange">
      <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
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
