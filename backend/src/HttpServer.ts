import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import route from "koa-route";
import { Store } from "./Store";

export class HttpServer {
  private app = new Koa();

  public constructor(store: Store) {
    this.app.use(cors());
    this.app.use(bodyParser());

    this.app.use(
      route.post("/descriptions", async (context) => {
        store.set(context.request.body);
        context.status = 200;
      })
    );

    this.app.use(
      route.get("/descriptions", async (context) => {
        context.body = store.get();
      })
    );
  }

  public listen(port: number) {
    this.app.listen(port);
  }
}
