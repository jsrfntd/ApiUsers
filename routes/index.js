import express from 'express';
import userController from '../controllers/UserController'


const router = express.Router()

//det all todos
router.get('/api/v1/users', userController.getAllUsers);

router.get('/api/v1/users/:id', userController.getUser);

router.post('/api/v1/users',userController.createUser);

router.put('/api/v1/users/:id',userController.updateUser);

router.delete('/api/v1/users/:id',userController.deleteUser);

export default router;
