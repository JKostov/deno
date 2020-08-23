import { Database } from './deps.ts';
import User from './models/user.ts';
import Todo from './models/todo.ts';

const db = new Database('postgres', {
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'deno-todo',
  port: 5000,
});

db.link([User, Todo]);

await Todo.drop();
await User.drop();

export default db;
