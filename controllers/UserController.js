import db from "../db/db";
import logger from "../utils/logger";
let userModel = require('../model/user');

class UserController {

    getAllUsers(req, res) {
        res.status(200).send(
            {
                success: 'true',
                message: 'users retrieved successfully',
                todos: db
            }
        );
    };


    getUser(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            db.map((todo) => {
                if (todo.id === id) {
                    return res.status(200).send({
                        success: 'true',
                        message: 'user retrieved successfully',
                        todo,
                    });
                }
            });
            return res.status(404).send({
                success: 'false',
                message: 'todo does not exist',
            });
        } catch (e) {
            logger.error('Error al ejecutar el código');
            logger.error(e.stack);
        }
    }

    createUser(req, res) {
        if (!req.body.userName) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'user name is required'
                }
            );
        } else if (!req.body.email) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'email is required'
                }
            );
        } else if (!req.body.name) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'name is required'
                }
            );
        }
        const userJson = {
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email
        }
        let user = new userModel(userJson);
        logger.info(user)
        user.save().then(
            doc => {
               logger.info(doc)
            }
        ).catch(
            err => {
                logger.error('Error al persisitir en la base de datos.')
                logger.error(err.stack)
            }
        );
        return res.status(201).send(
            {
                success: 'true',
                message: 'User created succesfully',
                user
            }
        )
    }


    updateUser(req, res) {
        const id = parseInt(req.params.id, 10);
        let userFound;
        let itemIndex;
        db.map((user, index) => {
                if (user.id === id) {
                    userFound = user;
                    itemIndex = index;
                }
            }
        );
        if (!userFound) {
            return res.status(404).send(
                {
                    success: 'false',
                    message: 'User not found'
                }
            )
        }

        if (!req.body.name) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'name is required'
                }
            );
        } else if (!req.body.userName) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'userName is required'
                }
            );
        } else if (!req.body.email) {
            return res.status(400).send(
                {
                    success: 'false',
                    message: 'email is required'
                }
            );
        }

        const updatedUser = {
            id: userFound.id,
            name: req.body.name || userFound.name,
            email: req.body.email || userFound.email,
            userName: req.body.userName || userFound.userName
        };

        db.splice(itemIndex, 1, updatedUser);

        return res.status(201).send(
            {
                succes: 'True',
                message: 'User updated succesfully',
                updatedUser
            }
        );
    }

    deleteUser(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map((user, index) => {
                if (user.id === id) {
                    db.splice(index, 1);
                    return res.status(200).send(
                        {
                            success: 'true',
                            message: 'User deleted succesfully'
                        }
                    );
                }
            }
        );
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });
    }
}

const userController = new UserController();
export default userController;
