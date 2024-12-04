import {model, Schema} from 'mongoose'
interface Iuser{
    name:string,
    email: string,
    password:string,
    rol:string
}
const UserSchema = new Schema<Iuser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    }
},{timestamps:true});

export const UserModel = model<Iuser>('users', UserSchema)