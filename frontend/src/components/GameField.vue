<template>
  <span>
    <input
      :value="value"
      v-on:input="updateValue($event.target.value)"
      required
      v-bind:placeholder="$t('configForm.game')"
    />
    <ul class="autocomplete-results" v-show="autocompleteVisible">
      <li
        v-for="(result, i) in autocompleteList"
        :key="i"
        @click="updateValue(result, true)"
        class="autocomplete-result"
      >
        {{ result }}
      </li>
    </ul>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getClientId } from "../api";

@Component
export default class GameField extends Vue {
  @Prop()
  public value!: string;
  public clientId?: string;
  public autocompleteList: string[] = [];
  public autocompleteVisible = false;

  public async mounted() {
    this.clientId = await getClientId();
  }

  public async updateValue(value: string, andCloseAutocomplete = false) {
    this.$emit("input", value);
    if (andCloseAutocomplete) {
      this.autocompleteVisible = false;
    } else {
      this.autocompleteList = await this.fetchAutocompleteList(value);
      this.autocompleteVisible = true;
    }
  }

  private async fetchAutocompleteList(value: string) {
    if (this.clientId && value.length > 0) {
      try {
        const result = await fetch(
          `https://api.twitch.tv/kraken/search/games?query=${value}`,
          {
            headers: {
              Accept: "application/vnd.twitchtv.v5+json",
              "Client-ID": this.clientId,
            },
          }
        );
        if (!result.ok) {
          throw new Error(await result.text());
        }
        const responseObject = await result.json();
        return responseObject.games.map((gameObj: any) => gameObj.name);
      } catch (error) {
        console.error(error);
        return [];
      }
    } else {
      return [];
    }
  }
}
</script>

<style>
.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
