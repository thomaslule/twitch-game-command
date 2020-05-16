import { readFileSync } from "fs";
import { Config } from "./Config";
import { DescriptionsStore } from "./DescriptionsStore";
import { getCommandHandler } from "./getCommandHandler";
import { HttpServer } from "./HttpServer";
import { Twitch } from "./Twitch";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
) as Config;

const store = new DescriptionsStore();
const server = new HttpServer(store);
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
