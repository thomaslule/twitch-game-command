import { cleanConfig, getDefaultConfig, validateConfig } from "./Config";

describe("Config", () => {
  describe("getDefaultConfig", () => {
    it("should return the correct default config", () => {
      const config = getDefaultConfig();
      expect(config).toEqual({
        command: "",
        cooldown: 0,
        defaultDescription: "",
        gameDescriptions: [],
      });
    });
  });

  describe("validateConfig", () => {
    it("should return an error in case of missing property", () => {
      const { error } = validateConfig({
        command: "",
        cooldown: 0,
        defaultDescription: "",
      });
      expect(error).toBeDefined();
    });

    it("should return no error in case of valid value", () => {
      const { error } = validateConfig(getDefaultConfig());
      expect(error).toBeUndefined();
    });
  });

  describe("cleanConfig", () => {
    it("should complete the value in case of missing property and remove additional properties", () => {
      const config = cleanConfig({
        command: "!game",
        cooldown: 30,
        defaultDescription: "",
        additional: "",
      });
      expect(config).toEqual({
        command: "!game",
        cooldown: 30,
        defaultDescription: "",
        gameDescriptions: [],
      });
    });

    it("should return the default config in case of invalid value", () => {
      const config = cleanConfig({ command: 0 });
      expect(config).toEqual(getDefaultConfig());
    });
  });
});
