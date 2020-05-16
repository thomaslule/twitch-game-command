import { DescriptionsStore } from "./DescriptionsStore";
import { Twitch } from "./Twitch";

export function getCommandHandler(twitch: Twitch, store: DescriptionsStore) {
  return async () => {
    try {
      const currentGame = await twitch.getCurrentGame();
      if (currentGame) {
        const description = store.get(currentGame);
        if (description) {
          twitch.say(description);
        } else {
          twitch.say("no description for this game");
        }
      } else {
        twitch.say(currentGame ? currentGame : "no current game");
      }
    } catch (err) {
      console.error(err);
    }
  };
}
