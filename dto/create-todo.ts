import { Schema, string, boolean } from '../deps.ts';

export default Schema({
  name: string.trim().normalize().between(2, 60),
  description: string.trim().normalize().max(260),
  at: string.optional(),
  done: boolean.optional(),
}).destruct();
