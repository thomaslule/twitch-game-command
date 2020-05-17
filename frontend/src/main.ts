import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import { locales } from "./locales";
import { getSelectedLocale } from "./selectedLocaleStore";

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({ locale: getSelectedLocale(), messages: locales });

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
