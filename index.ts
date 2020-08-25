import { Application, oakCors } from "./deps.ts";
import db from "./db.ts";
import errorMiddleWare from "./middlewares/error.ts";
import loggerMiddleWare from "./middlewares/logger.ts";
import homeRouter from "./routes/home.ts";
import authRouter from "./routes/auth.ts";
import todoRouter from "./routes/todo.ts";

await db.sync();
const app = new Application();

app.use(errorMiddleWare);
app.use(loggerMiddleWare);

app.use(oakCors());
app.use(homeRouter.routes());
app.use(authRouter.routes());
app.use(todoRouter.routes());

await app.listen({ port: 8000 });
