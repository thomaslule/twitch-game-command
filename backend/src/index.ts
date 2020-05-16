import { readFileSync } from "fs";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import route from "koa-route";
import { Config } from "./Config";
import { Twitch } from "./Twitch";

const config = JSON.parse(
  readFileSync(__dirname + "/local-config.json", "utf8")
) as Config;

let gameDescriptions: { [x: string]: string } = {};

const app = new Koa();

app.use(bodyParser());

app.use(
  route.post("/descriptions", async (context) => {
    gameDescriptions = context.request.body;
    context.status = 200;
  })
);

app.use(
  route.get("/descriptions", async (context) => {
    context.body = gameDescriptions;
  })
);

app.listen(config.port);

const twitch = new Twitch(config);

twitch.onCommand(async () => {
  try {
    const currentGame = await twitch.getCurrentGame();
    if (currentGame) {
      if (gameDescriptions[currentGame]) {
        twitch.say(gameDescriptions[currentGame]);
      } else {
        twitch.say("no description for this game");
      }
    } else {
      twitch.say(currentGame ? currentGame : "no current game");
    }
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
