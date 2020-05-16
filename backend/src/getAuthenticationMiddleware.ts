import { Context, Next } from "koa";
import fetch from "node-fetch";
import { Config } from "./Config";

export function getAuthenticationMiddleware(config: Config) {
  async function authenticationMiddleware(context: Context, next: Next) {
    const authorization = context.get("Authorization");
    if (authorization === "") {
      context.status = 401;
      context.body = { error: "Authorization header not found" };
      return;
    }
    const userResponse = await getLoginFromToken(authorization);
    if (!userResponse.success) {
      context.status = 401;
      context.body = { error: userResponse.error };
      return;
    }
    const login = userResponse.login.toLowerCase();
    if (!config.logins.map((login) => login.toLowerCase()).includes(login)) {
      context.status = 403;
      context.body = { error: `Login ${login} not authorized` };
      return;
    }
    await next();
  }

  return authenticationMiddleware;
}

async function getLoginFromToken(
  authorization: string
): Promise<TokenValidationResult> {
  const validateHttpResponse = await fetch(
    "https://id.twitch.tv/oauth2/validate",
    {
      headers: { Authorization: authorization },
    }
  );
  if (!validateHttpResponse.ok) {
    const twitchError = await validateHttpResponse.text();
    return { success: false, error: `Twitch answered: ${twitchError}` };
  }
  const validateResponse = await validateHttpResponse.json();
  return { success: true, login: validateResponse.login };
}
type TokenValidationResult = TokenValidationSuccess | TokenValidationFailure;
interface TokenValidationSuccess {
  success: true;
  login: string;
}
interface TokenValidationFailure {
  success: false;
  error: string;
}
