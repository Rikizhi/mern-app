import { Router } from 'express'

import { registrasi } from '../controllers/registrasi.js';

const registrasiRouter = Router();
registrasiRouter.post('/', registrasi);

export default registrasiRouter;