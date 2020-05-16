export class Store {
  private stored: Descriptions = {
    defaultDescription: "",
    gameDescriptions: [],
  };

  public get() {
    return this.stored;
  }

  public set(data: Descriptions) {
    this.stored = data;
  }
}

export interface Descriptions {
  defaultDescription: string;
  gameDescriptions: GameDescription[];
}

export interface GameDescription {
  game: string;
  description: string;
}
