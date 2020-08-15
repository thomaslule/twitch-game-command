import Joi from "@hapi/joi";
import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import route from "koa-route";
import serve from "koa-static";
import { join } from "path";
import { getAuthenticationMiddleware } from "./getAuthenticationMiddleware";
import { Options } from "./Options";
import { Store } from "./Store";

export class HttpServer {
  private app = new Koa();

  public constructor(store: Store, options: Options) {
    this.app.use(cors());
    this.app.use(bodyParser());

    this.app.use(serve(join(__dirname, "..", "public")));

    this.app.use(
      route.get("/api/clientId", (context) => {
        context.body = { clientId: options.client_id };
      })
    );

    this.app.use(getAuthenticationMiddleware(options));

    this.app.use(
      route.get("/api/checkToken", (context) => {
        context.status = 204;
      })
    );

    this.app.use(
      route.post("/api/config", async (context) => {
        const schema = Joi.object({
          command: Joi.string().allow(""),
          defaultDescription: Joi.string().allow(""),
          gameDescriptions: Joi.array().items(
            Joi.object({
              game: Joi.string(),
              description: Joi.string().allow(""),
            })
          ),
        });
        const { error, value } = schema.validate(context.request.body);
        if (error) {
          context.body = { error: error.message };
          context.status = 422;
        } else {
          await store.set(value);
          context.status = 200;
        }
      })
    );

    this.app.use(
      route.get("/api/config", async (context) => {
        context.body = store.get();
      })
    );
  }

  public listen(port: number) {
    this.app.listen(port);
  }
}
