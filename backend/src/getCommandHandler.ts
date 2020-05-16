import { Store } from "./Store";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: Store) {
  return async (message: string) => {
    try {
      const config = await store.get();
      if (config.command.length > 0 && message.startsWith(config.command)) {
        const currentGame = await twitch.getCurrentGame();
        const gameDescription = config.gameDescriptions.find(
          (description) => description.game === currentGame
        );
        twitch.say(
          gameDescription
            ? gameDescription.description
            : config.defaultDescription
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
}
