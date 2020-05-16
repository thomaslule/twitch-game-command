export class Store {
  private stored: StoredData = {
    defaultText: "",
    descriptions: [],
  };

  public get() {
    return this.stored;
  }

  public set(data: StoredData) {
    this.stored = data;
  }
}

export interface StoredData {
  defaultText: string;
  descriptions: Description[];
}

export interface Description {
  game: string;
  text: string;
}
