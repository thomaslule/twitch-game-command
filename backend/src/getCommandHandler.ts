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
        if (gameDescription?.description) {
          twitch.say(gameDescription.description);
        } else if (config.defaultDescription) {
          twitch.say(config.defaultDescription);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
}
