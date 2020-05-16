import { promises } from "fs";

export class Store {
  private cache: Config | undefined;

  public async get(): Promise<Config> {
    if (this.cache === undefined) {
      await this.initCache();
    }
    return this.cache!;
  }

  public async set(data: Config) {
    this.cache = data;
    await promises.writeFile(
      "./stored/save",
      JSON.stringify(this.cache),
      "utf8"
    );
  }

  private async initCache() {
    try {
      const json = await promises.readFile("./stored/save", "utf8");
      this.cache = JSON.parse(json);
    } catch (error) {
      await this.set({ defaultDescription: "", gameDescriptions: [] });
    }
  }
}

export interface Config {
  defaultDescription: string;
  gameDescriptions: GameDescription[];
}

export interface GameDescription {
  game: string;
  description: string;
}
