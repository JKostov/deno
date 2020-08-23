import { Status, compare, makeJwt, Jose, Payload, hash } from '../deps.ts';
import User from '../models/user.ts';

export async function register(ctx: any) {
  const body = await ctx.request.body().value;

  body.password = await hash(body.password);
  const user = await User.where('email', body.email).first();

  if (user) {
    ctx.throw(Status.Conflict, 'Email Address Already Taken!');
  }

  const { id } = await User.create(body);

  ctx.response.status = Status.Created;
  ctx.response.type = 'json';
  ctx.response.body = {
    status: 'success',
    message: `Registration successful`,
    data: {
      user: {
        id,
      },
    },
  };
}

export async function login(ctx: any) {
  const body = await ctx.request.body().value;

  const user = await User.where('email', body.email).first();

  if (!user) {
    ctx.throw(Status.UnprocessableEntity, 'Wrong Email Address!');
  } else if (await compare(body.password, user.password)) {
    const header: Jose = { alg: 'HS256', typ: 'JWT' };
    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const key: string = Deno.env.get('TOKEN_SECRET') ||
      'H3EgqdTJ1SqtOekMQXxwufbo2iPpu89O';

    const token = makeJwt({ header, payload, key });

    ctx.response.status = Status.OK;
    ctx.response.type = 'json';
    ctx.response.body = {
      status: 'success',
      message: `Logged in with ${body.email}`,
      data: { accessToken: token },
    };
  } else {
    ctx.throw(Status.Unauthorized, 'Wrong Password!');
  }
}
