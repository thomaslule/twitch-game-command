import Joi from "@hapi/joi";

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

export function validateConfig(value: unknown) {
  return configSchema.validate(value, { presence: "required" });
}

export function cleanConfig(value: unknown): Config {
  const validationResult = configSchema.validate(value, {
    allowUnknown: true,
    stripUnknown: true,
    presence: "optional",
  });
  if (validationResult.error) {
    return getDefaultConfig();
  }
  return validationResult.value;
}

export function getDefaultConfig(): Config {
  const { value } = configSchema.validate({});
  return value;
}

const configSchema = Joi.object({
  command: Joi.string().allow("").default(""),
  cooldown: Joi.number().integer().min(0).default(0),
  defaultDescription: Joi.string().allow("").default(""),
  gameDescriptions: Joi.array()
    .items(
      Joi.object({
        game: Joi.string().default(""),
        description: Joi.string().allow("").default(""),
      })
    )
    .default([]),
});
