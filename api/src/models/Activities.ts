import { model, Schema } from "mongoose";

interface IActivities{
    tittle: string,
    dateEnd: String,
    description: string,
    status: "Active"| "Pending",
    idUser: Schema.Types.ObjectId | string
}

const ActivitiSchema = new Schema<IActivities>({
    tittle: {
        type: String,
        required: true
    },
    dateEnd:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:["Active", "Pending"]
    },
    idUser:{
        type:Schema.Types.ObjectId || String,
        required:true,
        ref:"users"
    }
},{timestamps:true});

export const ActivitiModel = model<IActivities>('Activities', ActivitiSchema)