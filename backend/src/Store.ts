import { promises } from "fs";
import { join } from "path";
import { Config } from "./Config";

const saveDir = join(process.cwd(), "stored");
const saveFile = join(saveDir, "save");

export class Store {
  private cache: Config | undefined;

  public constructor(private defaultValues: Config) {}

  public async init() {
    await this.createDirIfNotExists();
    await this.initCache();
  }

  public get(): Config {
    return this.cache!;
  }

  public async set(data: Config) {
    this.cache = data;
    await promises.writeFile(saveFile, JSON.stringify(this.cache), "utf8");
  }

  private async initCache() {
    try {
      const json = await promises.readFile(saveFile, "utf8");
      const stored = JSON.parse(json);
      const storedCompleted = { ...this.defaultValues, ...stored };
      await this.set(storedCompleted);
    } catch (error) {
      await this.set(this.defaultValues);
    }
  }

  private async createDirIfNotExists() {
    await promises.mkdir(saveDir, {
      recursive: true,
    });
  }
}
