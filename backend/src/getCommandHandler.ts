import { Store } from "./Store";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: Store) {
  return async (message: string) => {
    try {
      const config = store.get();
      if (config.command.length > 0 && isCommand(config.command, message)) {
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

function isCommand(command: string, message: string) {
  return message === command || message.startsWith(command + " ");
}
