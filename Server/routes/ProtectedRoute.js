import express from 'express'
import authenticateJWT  from '../middleware/AuthenticateJWT.js'

const protectedRouter = express.Router();

protectedRouter.get('/', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

export default protectedRouter;