import {model, Schema} from 'mongoose'
interface Iuser{
    name:String,
    email: String,
    password:String,
    rol: String
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
        default: "Client"
    }
},{timestamps:true});

export const UserModel = model<Iuser>('users', UserSchema)