import { Client } from "tmi.js";
import TwitchClient from "twitch";
import { Options } from "./Options";

export class Twitch {
  private apiClient: TwitchClient;
  private chatBot: Client;

  public constructor(private options: Options) {
    this.apiClient = TwitchClient.withClientCredentials(
      options.client_id,
      options.client_secret
    );
    this.chatBot = Client({
      channels: [options.channel],
      identity: {
        username: options.bot_name,
        password: options.bot_token,
      },
      options: { debug: false },
      connection: { reconnect: true },
    });
  }

  public async connect() {
    await this.chatBot.connect();
  }

  public onMessage(handler: (message: string) => void) {
    this.chatBot.on("chat", (channel, userstate, message, self) => {
      if (self) {
        return;
      }
      handler(message);
    });
  }

  public say(message: string) {
    this.chatBot.say(`#${this.options.channel}`, message);
  }

  public async getCurrentGame() {
    const stream = await this.apiClient.helix.streams.getStreamByUserName(
      this.options.channel
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
