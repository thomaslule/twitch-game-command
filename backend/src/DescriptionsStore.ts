export class DescriptionsStore {
  private descriptions: Description[] = [];

  public getAll() {
    return this.descriptions;
  }

  public get(game: string) {
    return this.descriptions.find((description) => description.game === game)
      ?.text;
  }

  public set(descriptions: Description[]) {
    this.descriptions = descriptions;
  }
}

export interface Description {
  game: string;
  text: string;
}
