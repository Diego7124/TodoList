import { model, Schema } from "mongoose";

interface IActivities{
    title: String,
    dateEnd: Date,
    description: String,
    status: "Active"| "Pending",
    idUser: Schema.Types.ObjectId | String
}

const ActivitiSchema = new Schema<IActivities>({
    title: {
        type: String,
        required: true
    },
    dateEnd:{
        type: Date,
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