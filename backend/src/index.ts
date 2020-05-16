import { readFileSync } from "fs";
import { Config } from "./Config";
import { getCommandHandler } from "./getCommandHandler";
import { HttpServer } from "./HttpServer";
import { Store } from "./Store";
import { Twitch } from "./Twitch";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
) as Config;

const store = new Store();
const server = new HttpServer(store, config);
const twitch = new Twitch(config);

twitch.onCommand(getCommandHandler(twitch, store));

async function start() {
  await twitch.connect();
  server.listen(config.port);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
