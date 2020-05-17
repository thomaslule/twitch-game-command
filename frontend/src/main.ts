import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import { locales } from "./locales";

Vue.config.productionTip = false;

Vue.use(VueI18n);

new Vue({
  render: (h) => h(App),
  i18n: new VueI18n({ locale: "en", messages: locales }),
}).$mount("#app");
