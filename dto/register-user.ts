import { Schema, string } from '../deps.ts';

export default Schema({
  firstName: string.trim().normalize().between(3, 60),
  lastName: string.trim().normalize().between(3, 60),
  email: string.regexp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: string.trim().normalize().between(5, 60),
}).destruct();
