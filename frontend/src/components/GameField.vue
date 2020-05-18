<template>
  <span>
    <input
      :value="value"
      v-on:input="updateValue($event.target.value)"
      required
      v-bind:placeholder="$t('configForm.game')"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnter"
    />
    <ul class="autocomplete-results" v-show="autocompleteVisible">
      <li
        v-for="(result, i) in autocompleteList"
        :key="i"
        @click="updateValue(result, true)"
        class="autocomplete-result"
        :class="{ active: i === arrowCounter }"
        @mouseover="onMouseOver(i)"
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
  public arrowCounter = -1;

  public async mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.clientId = await getClientId();
  }

  public destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  public handleClickOutside(evt: any) {
    if (!this.$el.contains(evt.target)) {
      this.autocompleteVisible = false;
    }
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

  public onArrowDown() {
    if (this.arrowCounter < this.autocompleteList.length - 1) {
      this.arrowCounter = this.arrowCounter + 1;
    }
  }

  public onArrowUp() {
    if (this.arrowCounter >= 0) {
      this.arrowCounter = this.arrowCounter - 1;
    }
  }

  public async onEnter() {
    if (this.arrowCounter >= 0) {
      await this.updateValue(this.autocompleteList[this.arrowCounter], true);
      this.autocompleteVisible = false;
      this.arrowCounter = -1;
    }
  }

  public onMouseOver(index) {
    this.arrowCounter = index;
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

.autocomplete-result.active {
  background-color: #4aae9b;
  color: white;
}
</style>
