import { Store } from "./Store";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: Store) {
  return async () => {
    try {
      const currentGame = await twitch.getCurrentGame();
      const allDescriptions = store.get();
      const gameDescription = allDescriptions.gameDescriptions.find(
        (description) => description.game === currentGame
      );
      twitch.say(
        gameDescription
          ? gameDescription.description
          : allDescriptions.defaultDescription
      );
    } catch (err) {
      console.error(err);
    }
  };
}
