import { Router } from '../deps.ts';
import authorize from '../middlewares/authorize.ts';
import { getTodosForUser, getTodoForUserById, createTodo, updateTodo, deleteTodo } from '../controllers/todo.ts';
import validate from '../middlewares/validate.ts';
import createTodoSchema from '../dto/create-todo.ts';

const router = new Router();

router.get('/todos', authorize, getTodosForUser);
router.get('/todos/:todoId', authorize, getTodoForUserById);
router.post('/todos', authorize, validate(createTodoSchema), createTodo);
router.put('/todos/:todoId', authorize, validate(createTodoSchema), updateTodo);
router.delete('/todos/:todoId', authorize, deleteTodo);

export default router;
