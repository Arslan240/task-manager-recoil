import { useRecoilState, useRecoilValue } from "recoil"
import { completeTaskListSelector, taskListAtom } from "./atom"
import { useState } from "react"

const deleteIcon = `<?xml version="1.0" encoding="UTF-8"?><svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 15H40L37 44H11L8 15Z" fill="none" stroke="#333" stroke-width="1" stroke-linejoin="round"/><path d="M20.002 25.0024V35.0026" stroke="#333" stroke-width="1" stroke-linecap="round"/><path d="M28.0024 24.9995V34.9972" stroke="#333" stroke-width="1" stroke-linecap="round"/><path d="M12 14.9999L28.3242 3L36 15" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>`

const TaskManager = () => {
    const [taskList, setTaskList] = useRecoilState(taskListAtom)
    const completedTaskList = useRecoilValue(completeTaskListSelector)
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const handleAddTask = () => {
        if(newTaskTitle.trim() !== ''){
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                completed: false,
            }

            setTaskList([...taskList, newTask])
            setNewTaskTitle('')
        }
    }

    const handleToggleComplete = (id) => {
        const updatedTaskList = taskList.map(task => {
            if(task.id === id){
                return { ...task, completed: !task.completed }
            }
            return task;
        })
        setTaskList(updatedTaskList);
    }

  return (
    <div className="task-manager">
        <h2>TaskManager</h2>
        <div className="add-task">
            <label htmlFor="title">Task</label>
            <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="Enter Task Title"/>
            <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="">
            <h3>Task List</h3>
            <ul className="task-list">
                {
                    taskList.map(task => (
                        <li
                            key={task.id}
                            style={{textDecoration: task.completed ? 'line-through' : 'none'}}
                            onClick={() => handleToggleComplete(task.id)}
                            className="task added-task"
                        >
                            {task.title}
                           
                        </li>
                    ))
                }
            </ul>
        </div>
        <div>
            <h3>Completed Tasks</h3>
            <ul className="task-list">
                {
                    completedTaskList.map(task => (
                        <li key={task.id} className="task"
                        onClick={() => handleToggleComplete(task.id)}
                        >
                            {task.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default TaskManager