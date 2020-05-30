export function getOptions(): Options {
  const defaultOptions = {
    port: 3000,
  };
  const envOptions = getEnvOptions();
  const options = {
    ...defaultOptions,
    ...envOptions,
  };
  checkOptionsAreProvided(options);
  return options;
}

function getEnvOptions(): any {
  const prefix = "TWITCH_GAME_COMMAND_";

  const envKeys = Object.keys(process.env).filter((key) =>
    key.startsWith(prefix)
  );
  const envOptions: any = {};
  envKeys.forEach((key) => {
    envOptions[key.substring(prefix.length).toLowerCase()] = process.env[key]!;
  });
  return envOptions;
}

function checkOptionsAreProvided(options: any) {
  const missingOptions = optionKeys.filter(
    (key) => options[key] === undefined || options[key].length === 0
  );
  if (missingOptions.length > 0) {
    throw new Error(
      `The following options are missing: ${missingOptions.join(", ")}`
    );
  }
}

const optionKeys = [
  "channel",
  "bot_name",
  "bot_token",
  "client_id",
  "client_secret",
  "port",
  "logins",
];

export interface Options {
  channel: string;
  bot_name: string;
  bot_token: string;
  client_id: string;
  client_secret: string;
  port: string;
  logins: string;
}
