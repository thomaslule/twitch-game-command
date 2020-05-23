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
      >{{ result }}</li>
    </ul>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { throttle } from "throttle-debounce";
import { getClientId } from "../api";

@Component
export default class GameField extends Vue {
  @Prop()
  public value!: string;
  public clientId?: string;
  public autocompleteList: string[] = [];
  public autocompleteVisible = false;
  public arrowCounter = 0;
  private refreshAutocompleteThrottled = throttle(
    500,
    this.refreshAutocomplete
  );

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
      await this.refreshAutocompleteThrottled(value);
    }
  }

  public async onFocus() {
    await this.refreshAutocompleteThrottled(this.value);
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
    const trimmed = value.trim();
    let newValue = [];
    if (this.clientId && trimmed.length > 0) {
      try {
        newValue = await this.fetchAutocomplete(trimmed);
      } catch (error) {
        console.error(error);
      }
    }
    this.autocompleteList = newValue;
    this.autocompleteVisible = this.autocompleteList.length > 0;
    this.arrowCounter = 0;
  }

  private async fetchAutocomplete(value: string) {
    const result = await fetch(
      `https://api.twitch.tv/kraken/search/games?query=${value}`,
      {
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": this.clientId!,
        },
      }
    );
    if (!result.ok) {
      throw new Error(await result.text());
    }
    const { games } = await result.json();
    return games ? games.map((gameObj: any) => gameObj.name) : [];
  }
}
</script>

<style>
.game-field {
  display: block;
  margin-bottom: 0.5rem;
}

.game-field input {
  padding: 0.5rem;
}

.autocomplete-results {
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: rgb(255, 255, 255);
  border: 0.1rem solid rgb(238, 238, 238);
  max-height: 12rem;
  width: 24rem;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  padding: 0.5rem;
  cursor: pointer;
}

.autocomplete-result.active {
  background-color: rgb(177, 81, 230);
  color: rgb(255, 255, 255);
}
</style>
