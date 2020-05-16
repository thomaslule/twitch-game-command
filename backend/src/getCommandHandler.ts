import { Store } from "./Store";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: Store) {
  return async () => {
    try {
      const currentGame = await twitch.getCurrentGame();
      const config = await store.get();
      const gameDescription = config.gameDescriptions.find(
        (description) => description.game === currentGame
      );
      twitch.say(
        gameDescription
          ? gameDescription.description
          : config.defaultDescription
      );
    } catch (err) {
      console.error(err);
    }
  };
}
