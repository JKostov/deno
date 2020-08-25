import { Schema, string, boolean } from '../deps.ts';

export default Schema({
  name: string.trim().normalize().between(2, 60).optional(),
  description: string.trim().normalize().max(260).optional(),
  at: string.optional(),
  done: boolean.optional(),
}).destruct();
