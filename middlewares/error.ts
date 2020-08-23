
import { isHttpError, Status } from '../deps.ts';


export default async (ctx: any, next: any) => {
  try {
    await next();

    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
      ctx.throw(Status.NotFound, 'Not Found!');
    }
  } catch (err) {
    console.log(err);
    if (isHttpError(err)) {
      const status = err.status;

      ctx.response.status = status;
      ctx.response.type = 'json';
      ctx.response.body = {
        status: status >= 400 && status < 500 ? 'fail' : 'error',
        message: err.message,
      };
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'json';
      ctx.response.body = {
        message: err.message,
      };
    }
  }
};
