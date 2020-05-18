<template>
  <span class="game-field">
    <input
      :value="value"
      v-on:input="updateValue($event.target.value)"
      required
      v-bind:placeholder="$t('configForm.game')"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnter"
      @focus="onFocus"
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
  public arrowCounter = 0;

  public async mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.clientId = await getClientId();
  }

  public destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  public async updateValue(value: string, andCloseAutocomplete = false) {
    this.$emit("input", value);
    if (andCloseAutocomplete) {
      this.autocompleteVisible = false;
    } else {
      await this.refreshAutocomplete(value);
    }
  }

  public async onFocus() {
    await this.refreshAutocomplete(this.value);
  }

  public handleClickOutside(evt: any) {
    if (!this.$el.contains(evt.target)) {
      this.autocompleteVisible = false;
    }
  }

  public onArrowDown() {
    if (this.arrowCounter < this.autocompleteList.length - 1) {
      this.arrowCounter = this.arrowCounter + 1;
    }
  }

  public onArrowUp() {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
    }
  }

  public async onEnter() {
    if (
      this.autocompleteVisible &&
      this.autocompleteList.length > this.arrowCounter
    ) {
      await this.updateValue(this.autocompleteList[this.arrowCounter], true);
      this.autocompleteVisible = false;
    }
  }

  public onMouseOver(index: number) {
    this.arrowCounter = index;
  }

  private async refreshAutocomplete(value: string) {
    this.arrowCounter = 0;
    this.autocompleteList = await this.fetchAutocompleteList(value);
    this.autocompleteVisible = this.autocompleteList.length > 0;
  }

  private async fetchAutocompleteList(value: string) {
    const trimmed = value.trim();
    if (this.clientId && trimmed.length > 0) {
      try {
        const result = await fetch(
          `https://api.twitch.tv/kraken/search/games?query=${trimmed}`,
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
        const { games } = await result.json();
        return games ? games.map((gameObj: any) => gameObj.name) : [];
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
.game-field {
  display: block;
  margin-bottom: 5px;
}

.game-field input {
  padding: 5px;
}

.autocomplete-results {
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #eeeeee;
  height: 120px;
  width: 240px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  padding: 5px;
  cursor: pointer;
}

.autocomplete-result.active {
  background-color: #b151e6;
  color: white;
}
</style>