import { readFileSync } from "fs";
import TwitchClient from "twitch";
import { TwitchChannel } from "twitch-channel";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
);

const channel = new TwitchChannel({
  channel: config.channel,
  bot_name: config.bot_name,
  bot_token: config.bot_token,
  client_id: config.client_id,
  client_secret: config.client_secret,
  port: config.port,
  callback_url: config.callback_url,
  secret: config.secret,
});
const twitchClient = TwitchClient.withClientCredentials(
  config.client_id,
  config.client_secret
);
let currentGame: string | undefined;

channel.on("debug", (msg) => console.log(msg));
channel.on("info", (msg) => console.log(msg));
channel.on("error", (err) => console.error(err));

channel.on("chat", ({ message }) => {
  if (message.startsWith(config.command)) {
    channel.say(currentGame ? currentGame : "no current game");
  }
});
channel.on("stream-begin", ({ game }) => {
  console.log("stream-begin", game);
  currentGame = game;
});
channel.on("stream-change-game", ({ game }) => {
  console.log("stream-change-game", game);
  currentGame = game;
});
channel.on("stream-end", () => {
  console.log("stream-end");
  currentGame = undefined;
});

async function start() {
  await channel.connect();
  const stream = await twitchClient.helix.streams.getStreamByUserName(
    config.channel
  );
  if (stream) {
    const game = await stream.getGame();
    if (game) {
      currentGame = game.name;
    }
  }
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
