import { UserModel } from "../models/Users";
import {Request,Response} from 'express'


export default{
    signUp:async (req:Request, res:Response)=>{
        try {
        //end point
        const name = req.body.name;            
        const password = req.body.password;            
        const email = req.body.email;            
        const rol = req.body.rol; 
         
        if(!name || !password ||!email || !rol){
            res.status(400).json({msg:"Faltan parametros"})
            return;
        }
        //crea registro en la bd

        await UserModel.create({
            name,
            password,
            email,
            rol
        });

        res.status(200).json({msg:"Usuario almacenado con exito"});

        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({msg:"Ocurrio un error"});
            return;
        }
    },
    signIn:async (req:Request, res:Response)=>{
        try {
            //obt datos
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({
                email,
                password
            })

            //validar usuario existente
            if (!user){
                res.status(400).json({msg:"No se encontro el ususario con esas credenciales."})
                return;
            }
            res.status(200).json({msg:"el usuario inicio sesion correctamente", user})

        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({msg:"Ocurrio un error al iniciar sesion"});
            return;
        }
    }

}