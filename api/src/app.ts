import  Express, { Application, Request, Response }  from "express";
import cors from 'cors';


const app: Application = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.get("/", (_req:Request,res:Response)=>{
    res.send("Hola desde mi servidor con Ts");
})
export default app;