import { Router } from 'express'
import * as userController from './controller/user.js'
import { useMulter, fileFormat, HME } from './../../services/multer.js';

const router = Router();

router.get('/all', userController.getUsers);
router.post('/add', userController.addUser);
router.delete('/:id/delete', userController.deleteUser);
router.delete('/delete/many', userController.deleteMany);
router.patch('/:id/edit', userController.editUser);
router.patch('/:id/profilePic', useMulter(fileFormat.image).single('photo'), HME, userController.addProfilePic);


export default router
