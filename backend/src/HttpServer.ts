import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import route from "koa-route";
import { Config } from "./Config";
import { getAuthenticationMiddleware } from "./getAuthenticationMiddleware";
import { Store } from "./Store";

export class HttpServer {
  private app = new Koa();

  public constructor(store: Store, config: Config) {
    this.app.use(cors());
    this.app.use(bodyParser());

    this.app.use(
      route.get("/clientId", (context) => {
        context.body = { clientId: config.client_id };
      })
    );

    this.app.use(getAuthenticationMiddleware(config));

    this.app.use(
      route.get("/checkToken", (context) => {
        context.status = 204;
      })
    );

    this.app.use(
      route.post("/descriptions", async (context) => {
        await store.set(context.request.body);
        context.status = 200;
      })
    );

    this.app.use(
      route.get("/descriptions", async (context) => {
        context.body = await store.get();
      })
    );
  }

  public listen(port: number) {
    this.app.listen(port);
  }
}
