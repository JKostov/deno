import { Status } from '../deps.ts';

export default (validator: any) => async (ctx: any, next: any) => {
  const body = await ctx.request.body().value;
  const [err] = validator(body);

  if (err) {
    ctx.response.status = Status.BadRequest;
    ctx.response.type = 'json';
    ctx.response.body = err;
  } else {
    await next();
  }
}
