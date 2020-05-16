import { Client } from "tmi.js";
import TwitchClient from "twitch";
import { Config } from "./Config";

export class Twitch {
  private apiClient: TwitchClient;
  private chatBot: Client;

  public constructor(private config: Config) {
    this.apiClient = TwitchClient.withClientCredentials(
      config.client_id,
      config.client_secret
    );
    this.chatBot = Client({
      channels: [config.channel],
      identity: {
        username: config.bot_name,
        password: config.bot_token,
      },
      options: { debug: false },
      connection: { reconnect: true },
    });
  }

  public async connect() {
    await this.chatBot.connect();
  }

  public onCommand(handler: () => void) {
    this.chatBot.on("chat", (channel, userstate, message, self) => {
      if (self) {
        return;
      }
      if (message.startsWith(this.config.command)) {
        handler();
      }
    });
  }

  public say(message: string) {
    this.chatBot.say(`#${this.config.channel}`, message);
  }

  public async getCurrentGame() {
    const stream = await this.apiClient.helix.streams.getStreamByUserName(
      this.config.channel
    );
    if (stream) {
      const game = await stream.getGame();
      if (game) {
        return game.name;
      }
    }
    return undefined;
  }
}
