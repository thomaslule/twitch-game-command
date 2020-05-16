export class DescriptionsStore {
  private descriptions: Descriptions = {};

  public get() {
    return this.descriptions;
  }

  public set(descriptions: Descriptions) {
    this.descriptions = descriptions;
  }
}

export type Descriptions = { [x: string]: string };
