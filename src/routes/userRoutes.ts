import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import { error } from 'console';

const router = express.Router();

//obtener todos los usuarios

router.get('/', async (_req, res)=>{
    const users = await User.find();
    res.json(users);
});

//obtener usuario por id

router.get('/:id', async(req, res)=>{
    const{ id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'EL ID ES INVALIDO' });
    }
    try{
        const user = await User.findById(id);
        if (!user) return res.status(400).json({error: 'USUARIO NO ENCONTRADO'});
        res.json(user);
    }
    catch(err){
        res.status(500).json({error: 'Error al buscar al usuario'});
    }
});

//agregar nuevo usuario
router.post('/', async (req, res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (err){
        res.status(400).json({error: 'Error al crear al nuevo usuario'})
    }
});


//editar usuario
router.put('/:id', async (req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'ID INVALIDO' });
    }
    try{
        const updateUser = await User.findByIdAndUpdate(id,req.body, {
            runValidators:true,
        });
        if(!updateUser){
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(updateUser);
    }
    catch (err){
        res.status(400).json( {error: 'Error al actualizar usuario'});
    }
});


//eliminar al usuario
router.delete('/:id', async(req,res)=>{
    const{ id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error:'ID invalido' });
    }

    try{
        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }

        res.json({ messaje: 'Usuario eliminado satisfactoriamente' });
    }
    catch (err)
    { 
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el usuario' });
    }
});


export default router;