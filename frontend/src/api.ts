import { getToken, logout } from "./auth";

export async function getConfig(): Promise<Config> {
  return await get("config");
}

export async function postConfig(config: Config) {
  await post("config", config);
}

export async function getClientId(): Promise<string> {
  const { clientId } = await get("clientId");
  return clientId;
}

export async function checkToken() {
  await get("checkToken");
}

async function get(path: string) {
  const res = await fetch(`${process.env.VUE_APP_API_URL}/${path}`, {
    headers: { Authorization: `OAuth ${getToken()}` },
  });
  await handleError(res);
  return await res.json();
}

async function post(path: string, body: object) {
  const res = await fetch(`${process.env.VUE_APP_API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  await handleError(res);
}

async function handleError(res: Response) {
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      logout();
    }
    throw new Error(await res.text());
  }
}

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
