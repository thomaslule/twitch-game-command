import { readFileSync } from "fs";
import { Twitch } from "./Twitch";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
);

const twitch = new Twitch(config);

twitch.onCommand(async () => {
  try {
    const currentGame = await twitch.getCurrentGame();
    twitch.say(currentGame ? currentGame : "no current game");
  } catch (err) {
    console.error(err);
  }
});

async function start() {
  await twitch.connect();
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
