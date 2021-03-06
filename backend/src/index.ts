import { config } from "dotenv";
import { getCommandHandler } from "./getCommandHandler";
import { HttpServer } from "./HttpServer";
import { getOptions } from "./Options";
import { Store } from "./Store";
import { Twitch } from "./Twitch";

async function start() {
  config();
  const options = getOptions();

  const store = new Store({
    command: "",
    cooldown: 0,
    defaultDescription: "",
    gameDescriptions: [],
  });
  await store.init();
  const server = new HttpServer(store, options);
  const twitch = new Twitch(options);

  twitch.onMessage(getCommandHandler(twitch, store));

  await twitch.connect();
  server.listen(parseInt(options.port, 10));
  console.log(`Listening to ${options.port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
