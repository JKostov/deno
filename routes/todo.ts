import { Router, Status, Context } from '../deps.ts';

const router = new Router();

router.get('/todos', (ctx: Context) => {
  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = {
    message: 'Todos data',
  };
});

export default router;
