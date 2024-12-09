import { ActivitiModel } from "../models/Activities";
import { UserModel } from '../models/Users';
import { Request, Response } from "express";

export default {
    create: async (req: Request, res: Response) => {
        try {
            const { title, dateEnd, description, status, idUser } = req.body;

            if (!title || !dateEnd || !description || !status || !idUser) {
                res.status(400).json({ msg: "Faltan parametros para crear la actividad" });
                return;
            }

            const activity = await ActivitiModel.create({ title, dateEnd, description, status, idUser });

            // Validar existencia de usuario
            const user = await UserModel.findById(idUser);
            if (!user) {
                res.status(400).json({ msg: "El usuario que intenta crear la actividad no existe" });
                return;
            }

            res.status(200).json({ msg: "Tarea almacenada con éxito", task: activity });
        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({ msg: "Ocurrió un error al crear la tarea" });
        }
    },

    getActiv: async (req: Request, res: Response) => {
        try {
            const { idUser } = req.query;

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

            res.status(200).json({ msg: "Actividades obtenidas con éxito", tasks: activities });
        } catch (error) {
            console.error("Error al obtener actividades", error);
            res.status(500).json({ msg: "Ocurrió un error al obtener las actividades" });
        }
    },

    deleteActiv: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ msg: "El ID de la actividad es requerido para eliminarla" });
                return;
            }

            if (!/^[0-9a-fA-F]{24}$/.test(String(id))) {
                res.status(400).json({ msg: "El ID proporcionado no es válido" });
                return;
            }

            const activity = await ActivitiModel.findById(id);
            if (!activity) {
                res.status(404).json({ msg: "La actividad no existe o ya fue eliminada" });
                return;
            }

            await ActivitiModel.deleteOne({ _id: id });

            res.status(200).json({ msg: "Actividad eliminada con éxito" });
        } catch (error) {
            console.error("Error al eliminar la actividad", error);
            res.status(500).json({ msg: "Ocurrió un error al eliminar la actividad" });
        }
    },
    UpdateActivi: async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
    
            if (!id || !status) {
                res.status(400).json({ message: "ID y estado son obligatorios." });
                return 
            }
    
            // Valida que el status sea válido
            if (!["Active", "Pending", "Completed"].includes(status)) {
                res.status(400).json({ message: "Estado inválido." });
                return
            }
    
            // Actualiza solo el estado
            const updatedActivity = await ActivitiModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
    
            if (!updatedActivity) {
                res.status(404).json({ message: "No se encontró la actividad." });
                return;
            }
    
            res.status(200).json({
                message: "Actividad actualizada exitosamente.",
                data: updatedActivity,
            });
        } catch (error) {
            console.log("Error al actualizar la actividad:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    }
    
    
    
};
