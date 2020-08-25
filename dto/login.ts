import { Schema, string } from "../deps.ts";

export default Schema({
  email: string.regexp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: string.trim().normalize().between(5, 60),
}).destruct();
