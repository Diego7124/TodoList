import app from "./app";
import mongoose  from "mongoose";


async function main() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/todolist"
        )
        console.log("Conexion a la BD existosa")
        app.listen(4000, ()=>{
            console.log("Servidor corriendo con exito")
        })
    } catch (error) {
    console.log("Ocurrio un error al inicializar la app")        
    }
}

main()