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
            const  {idUser}  = req.body;

            let activities;
            if (idUser) {
                
                const user = await UserModel.findById(idUser);
                if (!user) {
                    res.status(400).json({ msg: "El usuario no existe" });
                    return;
                }

                activities = await ActivitiModel.find({ idUser });
            } else {
              
                activities = await ActivitiModel.find();
            }

            res.status(200).json({ msg: "Actividades obtenidas con éxito", activities });
        } catch (error) {
            console.error("Error al obtener actividades", error);
            res.status(500).json({ msg: "Ocurrió un error al obtener las actividades" });
        }
    },
    deleteActiv: async (req: Request, res: Response) => {
        try {
            
            const { id } = req.body;
    
        
            if (!id) {
                res.status(400).json({ msg: "El ID de la actividad es requerido para eliminarla" });
                return
            }
    
           
            if (!/^[0-9a-fA-F]{24}$/.test(String(id))) {
                res.status(400).json({ msg: "El ID proporcionado no es válido" });
                return
            }
    
            
            const activity = await ActivitiModel.findById(id);
            if (!activity) {
                res.status(404).json({ msg: "La actividad no existe o ya fue eliminada" });
                return
            }
    
            
            await ActivitiModel.deleteOne({ _id: id });
    
           
            res.status(200).json({ msg: "Actividad eliminada con éxito" });
        } catch (error) {
            console.error("Error al eliminar la actividad", error);
            res.status(500).json({ msg: "Ocurrió un error al eliminar la actividad" });
            return
        }
    },
    UpdateActivi: async (req:Request, res:Response) =>{
        try {
            const { id, title, dateEnd, description, status, idUser } = req.body;
            
           if (!id || !title || !dateEnd || !description || !status || !idUser) {
             res.status(400).json({ message: "Todos los campos son requeridos." });
             return;
        }
        

        const UpdatedActivity = await ActivitiModel.findByIdAndUpdate(
            id,{title, dateEnd, description, status, idUser},
            {new:true}
        );
        if(!UpdatedActivity){
            res.status(404).json({msg:"No se pudo encontrar la actividad"})
            return;
        }

        res.status(200).json({ message: "Actividad actualizada exitosamente.", data: UpdatedActivity })
        } catch (error) {
            console.log("Error al actualizar la actividad:", error);
        res.status(500).json({ message: "Error interno del servidor." });
        return;
        }
    }
   
    
}