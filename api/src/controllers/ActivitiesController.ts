import { ActivitiModel } from "../models/Activities";
import {UserModel} from '../models/Users'
import {Request, Response} from "express"

export default {
    create:async (req:Request, res:Response) =>{
        try {

        const title = req.body.title;
        const dateEnd = req.body.dateEnd;
        const description = req.body.description;
        const status = req.body.status;
        const idUser = req.body.idUser;
        

        if(!title||!dateEnd||!description||!status||!idUser){
            res.status(400).json({msg:"Faltan parametros para crear la actividad"})
            return;
        }

        const activity = await ActivitiModel.create({
            title,
            dateEnd,
            description,
            status,
            idUser
        });

        res.status(200).json({msg:"Tarea almacenado con exito"});
        console.log("Actividad", activity)

        //validar exst ususarui]

        const user = await  UserModel.findById(idUser);
        if(!user){
            res.status(400).json({msg:"El usuario que intenta crear la actividad no existe"})
            return;
        }
        
        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({msg:"Ocurrio un error al Crear la tarea"});
            return;
        }
    },
    getActiv: async (req:Request, res:Response) =>{
        try {
            const { idUser } = req.query;

            let activities;
            if (idUser) {
                // Validar que el usuario existe
                const user = await UserModel.findById(idUser);
                if (!user) {
                    res.status(400).json({ msg: "El usuario no existe" });
                    return;
                }

                // Obtener actividades del usuario
                activities = await ActivitiModel.find({ idUser });
            } else {
                // Obtener todas las actividades
                activities = await ActivitiModel.find();
            }

            res.status(200).json({ msg: "Actividades obtenidas con éxito", activities });
        } catch (error) {
            console.error("Error al obtener actividades", error);
            res.status(500).json({ msg: "Ocurrió un error al obtener las actividades" });
        }
    }
}