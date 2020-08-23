import { Router } from '../deps.ts';
import validate from '../middlewares/validate.ts';
import registerUserSchema from '../dto/register-user.ts';
import loginSchema from '../dto/login.ts';
import { register, login } from '../controllers/auth.ts';

const router = new Router();

router.post('/auth/register', validate(registerUserSchema), register);
router.post('/auth/login', validate(loginSchema), login);

export default router;
