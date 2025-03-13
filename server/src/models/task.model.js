import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            trim: true
        },
        assignedTo:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true})

const Task = mongoose.model("Task", taskSchema)
export default Task