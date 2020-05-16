import { readFileSync } from "fs";
import { getCommandHandler } from "./getCommandHandler";
import { HttpServer } from "./HttpServer";
import { Options } from "./Options";
import { Store } from "./Store";
import { Twitch } from "./Twitch";

const options = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
) as Options;

const store = new Store();
const server = new HttpServer(store, options);
const twitch = new Twitch(options);

twitch.onCommand(getCommandHandler(twitch, store));

async function start() {
  await twitch.connect();
  server.listen(options.port);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
