import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { validate } from '../middlewares/validate';
import { userSchema } from '../schemas/userSchema';
import { get } from 'http';
import { Router } from 'express';

const router: Router=Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validate(userSchema),createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);


export default router;