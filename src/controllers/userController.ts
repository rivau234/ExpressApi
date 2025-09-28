import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

interface Params{
    id: any;
}

export const getAllUsers = async (_req: Request, res: Response) =>{
    const users = await User.find();
    res.json(users);
};

//obtener usuario por id
export const getUserById = async (req: Request<Params>, res:Response)=>{
    const { id } = req.params;//esto pasa un objeto no un array que es lo que se espera

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'EL ID ES INVALIDO' });
    }

    try{
        const user = await User.findById(id);
        if (!user) return res.status(400).json({error: 'USUARIO NO ENCONTRADO'});
        res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'ERROR DEL SERVIDOR'});
    }
};

//agregar nuevo usuario
export const createUser = async(req:Request,res:Response)=>{
    try{
        const newuser = new User(req.body);
        await newuser.save();
        res.status(201).json(newuser);  
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'ERROR AL CREAR AL NUEVO USUARIO'});
    }
};


//editar usuario
export const updateUser = async(req:Request<Params>,res:Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'ID INVALIDO' });
    }
    try{
        const updated = await User.findByIdAndUpdate(id, req.body,{new:true});

        if(!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        res.json(updated);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'ERROR AL ACTUALIZAR AL USUARIO'});
    }
};

//eliminar al usuario
export const deleteUser = async(req:Request<Params>,res:Response)=>{
    const{ id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error:'ID invalido' });
    }

    try{
        const deleted = await User.findByIdAndDelete(id);
        
        if(!deleted)return res.status(404).json({error: 'Usuario no encontrado'});
        
        res.json({ messaje: 'Usuario eliminado satisfactoriamente' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'ERROR AL ELIMINAR USUARIO'});
    }
};


