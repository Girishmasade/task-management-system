import Task from "../models/task.model.js"

export const addTask = async (req, res) => {
    try {
        const { title, description, assignedTo, priority} = req.body
        if (!title || !description || !assignedTo || !priority) {
            return res.status(400).json({
                success: false,
                message: 'All entries are required'
            })
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            priority: "medimum",
            status: "pending",
        })
        console.log(task);
        
        await task.save()

        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ message: "Invalid task data" });
    }
}