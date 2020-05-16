import { readFileSync } from "fs";
import { TwitchChannel } from "twitch-channel";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
);

const channel = new TwitchChannel(config);

channel.on("debug", (msg) => console.log(msg));
channel.on("info", (msg) => console.log(msg));
channel.on("error", (err) => console.error(err));

channel.on("chat", ({ message }) => {
  console.log("chat", message);
});
channel.on("stream-begin", ({ game }) => {
  console.log("stream-begin", game);
});
channel.on("stream-change-game", ({ game }) => {
  console.log("stream-change-game", game);
});
channel.on("stream-end", () => {
  console.log("stream-end");
});

channel.connect().catch((err) => {
  console.error(err);
  process.exit(1);
});
