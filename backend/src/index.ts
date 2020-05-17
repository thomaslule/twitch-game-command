import { getCommandHandler } from "./getCommandHandler";
import { HttpServer } from "./HttpServer";
import { getOptions } from "./Options";
import { Store } from "./Store";
import { Twitch } from "./Twitch";

async function start() {
  const options = await getOptions();

  const store = new Store();
  const server = new HttpServer(store, options);
  const twitch = new Twitch(options);

  twitch.onMessage(getCommandHandler(twitch, store));

  await twitch.connect();
  server.listen(options.port);
  console.log(`Listening to ${options.port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
