<template>
  <div>
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ChangeLanguage extends Vue {}
</script>
