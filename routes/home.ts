import { Router, Status, Context } from '../deps.ts';

const router = new Router();

router.get('/', (ctx: Context) => {
  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = {
    message: 'Hello world',
  };
});

export default router;
