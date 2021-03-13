import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import { useState } from 'react'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Studying React',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        },
        {
            id: 2,
            text: 'Studying VueJS Also',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        }]
    )

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
        setShowAddTask(false)
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header onAdd={ () => setShowAddTask(!showAddTask) } showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={ addTask }/>}
            { tasks.length > 0 ?
                <Tasks tasks={ tasks } onToggle={ toggleReminder } onDelete={ deleteTask }/> : 'No tasks to show.' }
        </div>
    )
}

export default App
