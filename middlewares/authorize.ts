import { Status, validateJwt } from "../deps.ts";
import User from "../models/user.ts";

export default async (ctx: any, next: any) => {
  const authHeader = ctx.request.headers.get("authorization");

  if (!authHeader) {
    ctx.throw(Status.Unauthorized, "Access Token Missing!");
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const key: string = Deno.env.get("TOKEN_SECRET") ||
        "H3EgqdTJ1SqtOekMQXxwufbo2iPpu89O";

      const { payload }: any = await validateJwt(token, key);

      const user = await User.where({ id: payload.id, email: payload.email })
        .first();

      if (!user) {
        ctx.throw(Status.Unauthorized);
      }

      delete user.password;
      ctx.request.user = user;
    } catch (err) {
      ctx.throw(Status.Unauthorized);
    }

    await next();
  }
};
