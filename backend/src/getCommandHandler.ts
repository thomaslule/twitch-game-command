import { Store } from "./Store";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: Store) {
  return async () => {
    try {
      const currentGame = await twitch.getCurrentGame();
      const stored = store.get();
      const description = stored.descriptions.find(
        (description) => description.game === currentGame
      );
      twitch.say(description ? description.text : stored.defaultText);
    } catch (err) {
      console.error(err);
    }
  };
}
