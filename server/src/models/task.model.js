import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    priority: {
        type: String,
        enum:['low', 'medimum', 'high'],
        default: 'medimum'
    },
    status: {
        type: String,
        enum:['pending', 'completed', 'in-progress'],
        default: 'pending'
    },
    image: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

const Task = mongoose.model('task', taskSchema)
export default Task