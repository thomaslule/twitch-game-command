import { readFileSync } from "fs";
import { Client } from "tmi.js";
import TwitchClient from "twitch";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
);

const twitchClient = TwitchClient.withClientCredentials(
  config.client_id,
  config.client_secret
);
const bot = Client({
  channels: [config.channel],
  identity: {
    username: config.bot_name,
    password: config.bot_token,
  },
  options: { debug: false },
  connection: { reconnect: true },
});

bot.on("chat", async (channel, userstate, message, self) => {
  try {
    if (self) {
      return;
    }
    if (message.startsWith(config.command)) {
      const currentGame = await getCurrentGame();
      bot.say(
        `#${config.channel}`,
        currentGame ? currentGame : "no current game"
      );
    }
  } catch (err) {
    console.error(err);
  }
});

async function start() {
  await bot.connect();
}

async function getCurrentGame() {
  const stream = await twitchClient.helix.streams.getStreamByUserName(
    config.channel
  );
  if (stream) {
    const game = await stream.getGame();
    if (game) {
      return game.name;
    }
  }
  return undefined;
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
