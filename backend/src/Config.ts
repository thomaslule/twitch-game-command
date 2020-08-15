export interface Config {
  command: string;
  cooldown: number;
  defaultDescription: string;
  gameDescriptions: GameDescription[];
}

export interface GameDescription {
  game: string;
  description: string;
}
