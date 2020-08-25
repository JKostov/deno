import { Status } from '../deps.ts';
import Todo from '../models/todo.ts'

export async function getTodosForUser(ctx: any) {
  const user = ctx.request.user;

  const todos = await Todo.where({ userId: user.id }).get();

  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = todos;
}

export async function getTodoForUserById(ctx: any) {
  const todoId = ctx.params.todoId;
  const user = ctx.request.user;

  const todo = await Todo.where({ id: todoId, userId: user.id }).first();

  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = todo;
}

export async function createTodo(ctx: any) {
  const todo = await ctx.request.body().value;
  const user = ctx.request.user;

  todo.userId = user.id;

  const createdTodo = await Todo.create(todo);

  ctx.response.status = Status.Created;
  ctx.response.type = 'json';
  ctx.response.body = createdTodo;
}

export async function updateTodo(ctx: any) {
  const todoId = ctx.params.todoId;
  const user = ctx.request.user;
  const data = await ctx.request.body().value;

  const todo = await Todo.where({ id: todoId, userId: user.id }).first();

  if (!todo) {
    ctx.throw(Status.BadRequest, 'Todo not found');
  }

  todo.done = data.done ? data.done : false;
  if (data.name) {
    todo.name = data.name;
  }
  if (data.description) {
    todo.description = data.description;
  }
  todo.at = data.at;

  await todo.update();

  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = todo;
}

export async function deleteTodo(ctx: any) {
  const todoId = ctx.params.todoId;
  const user = ctx.request.user;

  const todo = await Todo.where({ id: todoId, userId: user.id }).first();

  if (!todo) {
    return ctx.throw(Status.BadRequest, 'Todo not found');
  }

  await todo.delete();

  ctx.response.status = Status.OK;
  ctx.response.type = 'json';
  ctx.response.body = todo;
}
