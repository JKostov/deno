import { Application, oakCors } from './deps.ts';
import router from './routes/index.ts';

const app = new Application();

app.use(oakCors());
app.use(router.routes());

await app.listen({ port: 8000 });
