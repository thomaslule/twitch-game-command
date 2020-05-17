import { promises } from "fs";
import { Config } from "./Config";

const saveFile = "./stored/save";

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
    await promises.writeFile(saveFile, JSON.stringify(this.cache), "utf8");
  }

  private async initCache() {
    try {
      const json = await promises.readFile(saveFile, "utf8");
      this.cache = JSON.parse(json);
    } catch (error) {
      await this.set({
        command: "",
        defaultDescription: "",
        gameDescriptions: [],
      });
    }
  }
}
