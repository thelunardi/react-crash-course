import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import About from './components/About'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        return await res.json()
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${ id }`)
        return await res.json()
    }

    const addTask = async (task) => {
        const res = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${ id }`, { method: 'DELETE' })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToggle = await fetchTask(id)
        const updateTask = { ...taskToggle, reminder: !taskToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={ () => setShowAddTask(!showAddTask) } showAdd={ showAddTask }/>
                <Route
                    path='/'
                    exact
                    render={ (props) => (
                    <>
                        { showAddTask && <AddTask onAdd={ addTask }/> }
                        { tasks.length > 0 ?
                            <Tasks tasks={ tasks } onToggle={ toggleReminder }
                                   onDelete={ deleteTask }/> : 'No tasks to show.' }
                    </>
                ) }/>
                <Route path='/about' component={ About }/>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
